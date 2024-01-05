import express from 'express';
import moment from 'moment';
import { Op } from 'sequelize';

import config from '../../config/secrets';
import sequelize from '../../db';
import queues from '../../lib/queues';
import yup from '../../lib/yup';
import auth from '../../middlewares/auth';
import Civility from '../../models/Civility';
import Coordinate from '../../models/Coordinate';
import Department from '../../models/Department';
import models from '../../models/index';
import { requestPaymentSchema } from '../../schemas/subscriptionFees';
import { establishmentSubscriptionFee } from '../../schemas/subscriptionFees';
import { calculateSystemPaySignature } from '../../utils/crypto';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';
import { getCurrentYear } from '../../utils/time';
import EstablishmentYearlySubscriptions from '../../views/EstablishmentYearlySubscriptions';
import SubscriptionFeesYearlyPrevisioned from '../../views/SubscriptionFeesYearlyPrevisioned';
import SubscriptionFeesYearlyReceipts from '../../views/SubscriptionFeesYearlyReceipts';
const route = express.Router();

function generateUID() {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ('000' + firstPart.toString(36)).slice(-3);
    secondPart = ('000' + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}
const formatDate = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(8, 10);
    const min = date.substring(10, 12);
    return new Date(year, month, day, hour, min);
};
const {
    CapacityHistory,
    Function,
    Organization,
    Establishment,
    SubscriptionFee,
    FunctionLabel,
    SubscriptionParams,
    SubscriptionPayment,
    UnionSubscriptionFees,
    SubscriptionFeePaymentRef,
    User,
    History
} = models;

route.post('/send-reminder-email', auth(), async (req, res) => {
    const { data } = req?.body || {};

    try {
        const currentYear = getCurrentYear();
        const { partialModel, subject, recipient, establishmentId } = data;
        const html = partialModel?.replace('#ANNEE', currentYear);
        if (recipient) {
            const to = recipient;
            const msg = { from: config.email.from, to, subject, html };
            await queues.mail.add({ msg, establishmentId: establishmentId });
        }

        res.json({ ok: true });
    } catch (e) {
        res.status(500).end();
    }
});

export const getUnpaidEstablishmentInfo = async (id) => {
    const data = await SubscriptionParams.findOne({
        where: { id },
        include: [
            {
                model: SubscriptionFee,
                where: {
                    status: { [Op.in]: ['Solde initial', 'Solde partiel'] },
                    organizationId: { [Op.not]: null }
                },
                include: [
                    {
                        model: Organization,
                        where: {
                            isArchived: 0
                        },
                        include: [
                            {
                                model: Function,
                                include: [
                                    {
                                        model: User,

                                        include: [
                                            {
                                                model: Coordinate,
                                                where: {
                                                    label: 'Email perso'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        model: FunctionLabel,
                                        where: { isHeadMaster: 1 }
                                    }
                                ]
                            },

                            { model: Establishment, as: 'establishment' }
                        ]
                    }
                ]
            }
        ]
    });
    const { subscriptionFees, ...rest } = data?.toJSON() || {};
    const establishments = subscriptionFees?.map(({ organization }) => {
        return {
            id: organization?.id,
            name: organization?.name,
            email: organization?.functions[0]?.user?.coordinates[0]?.email,
            establishmentKey: organization?.establishment?.establishmentKey,
            establishmentId: organization?.establishment?.id
        };
    });
    const totalWithoutEmail = establishments?.filter((e) => !e?.email)?.length;
    return { ...rest, establishments, totalWithoutEmail };
};
route.post('/request-payment', auth(), async (req, res) => {
    const item = req.body;
    try {
        await requestPaymentSchema.validate(item);
        let total = 0.0;
        await Promise.all(
            item?.map(async (e) => {
                const fee = await SubscriptionFee.findOne({
                    where: {
                        id: e
                    }
                });
                if (fee) {
                    total += parseFloat(fee?.customAmount || fee?.calculatedAmount || 0);
                }
            })
        );
        const time = moment().format('YYYYMMDDHHmmss');
        const fields = {
            vads_action_mode: 'INTERACTIVE',
            vads_amount: `${total.toFixed(2).replace('.', '')}`,
            vads_ctx_mode: 'TEST',
            vads_currency: '978',
            vads_page_action: 'PAYMENT',
            vads_payment_config: 'SINGLE',
            vads_site_id: '55976207',
            vads_trans_date: time,
            vads_trans_id: generateUID().toUpperCase(),
            vads_version: 'V2',
            vads_order_info: item
        };
        res.json({
            ...fields,
            signature: calculateSystemPaySignature({ fields, key: 'X7qPGB9xTDjtQMKd' })
        });
    } catch (e) {
        res.status(500).end();
    }
});
route.get('/redirect-payment', (req, res) => {
    res.redirect(config.meta.frontUrl);
});
route.post('/handle-payment-notification', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const item = req.body;
        if (!item) throw new Error('invalid request');
        const { signature, vads_order_info, vads_trans_date, vads_trans_id, vads_trans_status } =
            item;
        const fields = Object.fromEntries(
            Object.entries(item)?.filter(([key]) => key.substring(0, 5) === 'vads_')
        );
        const calculatedSignature = calculateSystemPaySignature({
            fields,
            key: 'X7qPGB9xTDjtQMKd'
        });

        if (calculatedSignature !== signature && vads_trans_status !== 'AUTHORISED')
            throw new Error('An error occurred while computing the signature');
        await Promise.all(
            vads_order_info?.split(',').map(async (e) => {
                const data = await SubscriptionFee.findOne({ where: { id: e } });
                if (!data) throw new Error("Subsciption Fee dosen't exist");
                await SubscriptionFee.update(
                    {
                        status: 'Soldé'
                    },
                    { where: { id: data.id } },
                    { transaction }
                );
                const { id: paymentRefId } = await SubscriptionFeePaymentRef.create(
                    {
                        paimentType: 'Carte bancaire',
                        depositDate: formatDate(vads_trans_date),
                        cashedDate: new Date(),
                        reference: vads_trans_id,
                        bankStatus: vads_trans_status,
                        bankLogs: JSON.stringify(item)
                    },
                    { transaction }
                );
                await SubscriptionPayment.create(
                    {
                        subscriptionId: data.id,
                        paymentRefId,
                        amount: data?.customAmount ? data?.customAmount : data?.calculatedAmount
                    },
                    { transaction }
                );
            })
        );
        await transaction.commit();
        res.status(200).send();
    } catch (e) {
        await transaction.rollback();
        res.end();
    }
});

route.post('/handle-payment', async (req, res) => {
    res.redirect(`${config.meta.frontUrl}/success`);
});

route.get('/unpaid-establishement', async (req, res) => {
    try {
        const currentYear = getCurrentYear();
        const data = await SubscriptionParams.findOne({ where: { year: currentYear } });
        if (!data?.id) return res.json();
        res.json(await getUnpaidEstablishmentInfo(data?.id));
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/destroy/:id', auth(), async (req, res) => {
    const t = await sequelize.transaction();

    try {
        let { id } = req?.params || {};
        await SubscriptionFee.destroy(
            {
                where: { id }
            },
            { transaction: t }
        );
        await t.commit();
        res.json({ ok: true });
    } catch (e) {
        await t.rollback();
        res.status(500).end();
    }
});

route.get(
    '/establishments-yearly',
    auth({ action: 'list', subject: 'subscriptionFees.byEstablishment' }),
    async (req, res) => {
        try {
            res.json(
                await queryCollection({
                    params: {
                        ...extractParamsFromRequest(req)
                    },
                    sortableFields: [
                        'id',
                        'establishmentKey',
                        'name',
                        'year',
                        'collegeContractStudentsCount',
                        'lpContractStudentsCount',
                        'apprenticesCount',
                        'hoursCount',
                        'status',
                        'hoursCount'
                    ],
                    searchableFields: ['establishmentKey', 'name', 'year'],
                    filterOptions: {
                        establishmentNumber: yup.string(),
                        year: yup.string(),
                        status: yup.string(),
                        archived: yup.string()
                    },
                    internalFields: EstablishmentYearlySubscriptions.internalFields,
                    collection: EstablishmentYearlySubscriptions,
                    include: [
                        {
                            model: Organization,
                            include: [
                                Coordinate,
                                {
                                    model: Establishment,
                                    as: 'establishment',
                                    required: false,
                                    include: Department
                                }
                            ]
                        }
                    ]
                })
            );
        } catch (e) {
            res.status(500).end();
        }
    }
);
route.get(
    '/yearly-previsioned',
    auth({ action: 'list', subject: 'subscriptionFees.annualForcast' }),
    async (req, res) => {
        try {
            res.json(
                await queryCollection({
                    params: {
                        ...extractParamsFromRequest(req)
                    },
                    sortableFields: [
                        'year',
                        'fixedPart',
                        'countLTP',
                        'totalLTP',
                        'countHC',
                        'totalHC',
                        'countApprentice',
                        'totalApprentice',
                        'countTraineeHours',
                        'totalCFC'
                    ],
                    searchableFields: ['year'],
                    filterOptions: SubscriptionFeesYearlyPrevisioned.filterOptions,
                    internalFields: SubscriptionFeesYearlyPrevisioned.internalFields,
                    collection: SubscriptionFeesYearlyPrevisioned
                })
            );
        } catch (e) {
            res.status(500).end();
        }
    }
);

route.get(
    '/yearly-receipt',
    auth({ action: 'list', subject: 'subscriptionFees.annualCollected' }),
    async (req, res) => {
        try {
            res.json(
                await queryCollection({
                    params: {
                        ...extractParamsFromRequest(req)
                    },
                    sortableFields: ['year', 'paimentEtabs', 'fixedPart', 'total'],
                    searchableFields: ['year'],
                    filterOptions: SubscriptionFeesYearlyReceipts.filterOptions,
                    internalFields: SubscriptionFeesYearlyReceipts.internalFields,
                    collection: SubscriptionFeesYearlyReceipts
                })
            );
        } catch (e) {
            res.status(500).end();
        }
    }
);

route.get('/:id', auth({ action: 'view', subject: 'subscriptionFee' }), async (req, res) => {
    const id = req.params.id;
    try {
        res.json(
            await SubscriptionFee.findOne({
                where: { id },
                include: [
                    { model: SubscriptionPayment, include: SubscriptionFeePaymentRef },
                    {
                        model: SubscriptionFee,
                        as: 'userSubscriptionFees',
                        include: [
                            UnionSubscriptionFees,
                            {
                                model: SubscriptionPayment,
                                include: SubscriptionFeePaymentRef
                            },
                            { model: User, include: Civility }
                        ]
                    },
                    {
                        model: SubscriptionFee,
                        as: 'establishmentSubscriptionFees',
                        include: [
                            {
                                model: SubscriptionFee,
                                as: 'userSubscriptionFees',
                                include: [
                                    UnionSubscriptionFees,
                                    {
                                        model: SubscriptionPayment,
                                        include: SubscriptionFeePaymentRef
                                    },
                                    { model: User, include: Civility }
                                ]
                            },
                            { model: SubscriptionPayment, include: SubscriptionFeePaymentRef },

                            {
                                model: Organization,
                                include: [
                                    {
                                        model: Function,
                                        include: [
                                            {
                                                model: User,
                                                include: [
                                                    {
                                                        model: Coordinate,
                                                        where: {
                                                            label: 'Email perso'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                model: FunctionLabel,
                                                where: { isHeadMaster: 1 }
                                            }
                                        ]
                                    },
                                    {
                                        model: Establishment,
                                        as: 'establishment',
                                        required: false
                                    },
                                    {
                                        model: History,
                                        where: {
                                            historyIdType: 1
                                        },
                                        include: [{ model: User, include: Civility }],

                                        required: false
                                    }
                                ]
                            }
                        ]
                    },
                    SubscriptionParams,
                    {
                        model: Organization,

                        include: [
                            Coordinate,
                            {
                                model: Establishment,
                                as: 'establishment',
                                include: { model: Department }
                            },
                            CapacityHistory,
                            {
                                model: Function,
                                include: [
                                    {
                                        model: User,
                                        include: [
                                            {
                                                model: Coordinate,
                                                where: {
                                                    label: 'Email perso'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        model: FunctionLabel,
                                        where: { isHeadMaster: 1 }
                                    }
                                ]
                            },

                            {
                                model: History,
                                where: {
                                    historyIdType: 1
                                },
                                include: [{ model: User, include: Civility }],

                                required: false
                            }
                        ]
                    },
                    { model: User, include: Civility }
                ]
            })
        );
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

route.get('/', auth(), async (req, res) => {
    try {
        const currentYear = getCurrentYear();
        const currentYearSubscriptionParams = await SubscriptionParams.findOne({
            where: { year: currentYear }
        });
        const functions = await Function.findAll({
            where: { userId: req?.user?.profile?.id },
            include: [
                FunctionLabel,
                {
                    model: Organization,
                    include: [
                        Coordinate,
                        {
                            model: Function,
                            include: [
                                {
                                    model: User,
                                    include: [
                                        {
                                            model: Coordinate,
                                            where: {
                                                label: 'Email perso'
                                            }
                                        }
                                    ]
                                },
                                {
                                    model: FunctionLabel,
                                    where: { isHeadMaster: 1 }
                                }
                            ]
                        },

                        {
                            model: CapacityHistory,
                            where: { year: currentYear },
                            required: false
                        },
                        {
                            model: Establishment,
                            as: 'establishment'
                        },
                        {
                            model: SubscriptionFee,
                            where: { subscriptionFeeParamsId: currentYearSubscriptionParams.id },
                            include: [
                                {
                                    model: SubscriptionParams,
                                    required: false
                                },
                                SubscriptionPayment
                            ]
                        }
                    ]
                }
            ]
        });
        const headMasterAt = functions.filter(
            (e) =>
                (e?.startDate ? moment().isAfter(moment(e?.startDate)) : true) &&
                (e?.endDate ? moment().isBefore(moment(e?.endDate)) : true) &&
                e?.functionLabel?.isHeadMaster
        );
        if (headMasterAt?.length) {
            return res.json(headMasterAt);
        } else {
            res.status(401).end();
        }
    } catch (e) {
        res.status(500).end();
    }
});

route.post('/:id', async (req, res) => {
    const t = await sequelize.transaction();
    const id = req.params.id;

    try {
        const data = await establishmentSubscriptionFee.validate(req?.body);
        const { customAmount, status, payments } = data;

        const fee = (
            await SubscriptionFee.findOne({
                where: { id },
                include: [
                    { model: SubscriptionPayment, include: SubscriptionFeePaymentRef },
                    {
                        model: SubscriptionFee,
                        as: 'userSubscriptionFees',
                        include: [
                            UnionSubscriptionFees,
                            {
                                model: SubscriptionPayment,
                                include: SubscriptionFeePaymentRef
                            },
                            { model: User, include: Civility }
                        ]
                    },
                    {
                        model: SubscriptionFee,
                        as: 'establishmentSubscriptionFees',
                        include: [
                            {
                                model: SubscriptionFee,
                                as: 'userSubscriptionFees',
                                include: [
                                    UnionSubscriptionFees,
                                    {
                                        model: SubscriptionPayment,
                                        include: SubscriptionFeePaymentRef
                                    },
                                    { model: User, include: Civility }
                                ]
                            },
                            { model: SubscriptionPayment, include: SubscriptionFeePaymentRef },
                            {
                                model: Organization,
                                include: [
                                    {
                                        model: Establishment,
                                        as: 'establishment',
                                        required: false
                                    },

                                    {
                                        model: History,
                                        where: {
                                            historyIdType: 1
                                        },
                                        include: [{ model: User, include: Civility }],

                                        required: false
                                    }
                                ]
                            }
                        ]
                    },
                    SubscriptionParams,
                    {
                        model: Organization,
                        include: [{ model: Establishment, as: 'establishment' }]
                    },
                    { model: User, include: Civility }
                ]
            })
        ).toJSON();
        //remap data
        const oldPayments = Object.values(
            [
                ...(fee.subscriptionPayments || []).map((e) => ({
                    ...e,
                    type: 'organization',
                    entityId: res?.data?.organization?.id
                })),
                ...(fee?.userSubscriptionFees
                    ?.map((e) =>
                        e?.subscriptionPayments?.map((s) => ({
                            ...s,
                            entityId: e?.user?.id
                        }))
                    )
                    .flat()
                    ?.map((e) => ({ ...e, type: 'user' })) || [])
            ].reduce((acc, cv) => {
                if (acc[cv?.paymentRefId]) {
                    acc[cv?.paymentRefId] = {
                        ...acc[cv?.paymentRefId],
                        enitiesPayments: [...acc[cv?.paymentRefId].enitiesPayments, cv]
                    };
                } else {
                    acc[cv?.paymentRefId] = {
                        ...cv.subscriptionFeesPaymentRef,
                        enitiesPayments: [cv]
                    };
                }
                return acc;
            }, {})
        );
        const refactoredFee = {
            payments: oldPayments,
            id: fee.id,
            status: fee.status
        };
        //update subscriptionfee
        await SubscriptionFee.update(
            {
                status,
                customAmount: customAmount ? customAmount : null
            },
            {
                where: { id }
            },
            {
                transaction: t
            }
        );
        const newPaymentsIds = payments?.reduce(
            (pv, cv) => [...pv, ...(cv?.enitiesPayments || [])],
            []
        );
        //delete  paiment and ref paiment
        await Promise.all(
            refactoredFee?.payments
                ?.reduce((pv, cv) => [...pv, ...(cv?.enitiesPayments || [])], [])
                ?.filter((e) => !newPaymentsIds?.find((a) => a.paymentId === e?.id))
                ?.map(async (e) => {
                    if (e?.id) {
                        await SubscriptionPayment.destroy(
                            {
                                where: {
                                    id: e?.id
                                }
                            },
                            { transaction: t }
                        );
                        await SubscriptionFeePaymentRef.destroy(
                            {
                                where: {
                                    id: e?.paymentRefId
                                }
                            },
                            { transaction: t }
                        );
                    }
                })
        );
        await Promise.all(
            payments?.map(async (e) => {
                const {
                    comment,
                    paimentType,
                    depositDate,
                    reference,
                    cashedDate,
                    enitiesPayments
                } = e;
                const entity = enitiesPayments?.find((e) => e?.type === 'organization');
                if (entity) {
                    const paiment = await SubscriptionFeePaymentRef.upsert(
                        {
                            id: entity?.paymentRefId,
                            comment,
                            paimentType,
                            depositDate,
                            cashedDate,
                            reference
                        },
                        { transaction: t }
                    );
                    await SubscriptionPayment.upsert(
                        {
                            id: entity.paymentId,
                            subscriptionId: id,
                            paymentRefId: paiment[0]?.id,
                            amount: entity.amount
                        },
                        { transaction: t }
                    );
                }
            })
        );
        await t.commit();
        res.json({ status: true });
    } catch (e) {
        await t.rollback();
        res.status(500).end();
    }
});

export default route;
