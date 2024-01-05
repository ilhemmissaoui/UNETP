import axios from 'axios';
import express from 'express';
import moment from 'moment';
import { Op } from 'sequelize';

import config from '../../config/secrets';
import sequelize from '../../db';
import { amountCalculator } from '../../lib/helpers';
import queues from '../../lib/queues';
import yup from '../../lib/yup';
import auth from '../../middlewares/auth';
import models from '../../models/index';
import subscriptionFeesParams from '../../schemas/subscriptionFeesParams';
import generateCRUD from '../../utils/generateCRUD';
import { getUnpaidEstablishmentInfo } from './subscriptionFees.route';

const {
    SubscriptionParams,
    SubscriptionFee,
    CapacityHistory,
    Organization,
    Coordinate,
    Establishment,
    Meta,
    Function,
    User,
    FunctionLabel
} = models;
const route = express.Router();
generateCRUD(
    route,
    SubscriptionParams,
    'subscriptionParam',
    'subscriptionParams',
    subscriptionFeesParams,
    {
        createFunction: async (item, transaction) => {
            //create fee parameter
            const { id: subscriptionFeeParamsId } = await SubscriptionParams.create(
                { ...item },
                { transaction }
            );

            const organizationIncluded = await Organization.findAll({
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
                    { model: Establishment, required: true, as: 'establishment' },
                    { model: CapacityHistory }
                ]
            });
            //create subscription fee for every establishment
            await Promise.all(
                organizationIncluded.map(async (e) => {
                    const capacityHistory = e?.capacityHistories?.find((a) => a.year == item.year);
                    const calculatedAmount = amountCalculator(
                        capacityHistory || {},
                        item,
                        e?.establishment?.establishmentKey
                    );
                    await SubscriptionFee.create(
                        {
                            subscriptionFeeParamsId,
                            organizationId: e.id,
                            calculatedAmount,
                            status: 'Solde initial',
                            reminderCount:
                                item?.nextCall === "Appel immédiat (à l'enregistrement)" ? 1 : 0
                        },
                        { transaction }
                    );
                })
            );
            //send mails directly
            if (item?.nextCall == "Appel immédiat (à l'enregistrement)") {
                const mailModel = await Meta.findAll();
                const from =
                    mailModel.find((f) => f?.name === 'relance_cotisation_de')?.value ||
                    config.email.from;
                const body = mailModel.find((f) => f?.name === 'relance_cotisation_modele')?.value;
                const subject = `Rappel de cotisations UNETP ${item?.year}`;
                await organizationIncluded?.map(async (e) => {
                    const { name } = e;
                    const email = e?.functions[0]?.user?.coordinates[0]?.email;
                    if (email) {
                        const html = body.replace('#NOM', name);
                        const to = email;
                        const msg = { from, to, subject, html };
                        await queues.mail.add({ msg, establishmentId: e?.establishment?.id });
                    }
                });
            } else if (item?.nextCall === 'Appel programmé') {
                const remindDate = moment(item?.remindDate);
                const data = {
                    api_key: config.cronicle.apiKey,
                    title: `subscription (${item.year})`,
                    enabled: 1,
                    category: 'general',
                    target: 'allgrp',
                    params: {
                        method: 'POST',
                        url: `${config?.baseUrl}/api/v1/subscription-params/test-event/${subscriptionFeeParamsId}`
                    },
                    plugin: 'urlplug',
                    timing: {
                        years: [remindDate.year()],
                        months: [remindDate.month() + 1],
                        days: [remindDate.date()],
                        hours: [remindDate.hour()],
                        minutes: [remindDate.minute()]
                    }
                };
                await axios.post(`${config.cronicle.url}/api/app/create_event`, data);
            }
        },
        routes: {
            create: true,
            list: true,
            view: false,
            update: true,
            _delete: true,
            bulkUpdate: true,
            bulkDelete: true
        },
        queryCollection: {
            searchableFields: ['year'],
            sortableFields: [
                'id',
                'year',
                'cfaUfa',
                'cfpCfc',
                'employerCollegeOperation',
                'headEstablishment',
                'otherLeader',
                'oldHeadEstablishment',
                'fixedPart034',
                'fixedPart12'
            ],
            filterOptions: {
                year: yup.string()
            }
        },
        guards: {
            list: auth({ action: 'list', subject: 'subscription-param' }),
            view: auth({ action: 'view', subject: 'subscription-param' }),
            create: auth({ action: 'create', subject: 'subscription-param' }),
            write: auth({ action: 'write', subject: 'subscription-param' }),
            delete: auth({ action: 'delete', subject: 'subscription-param' })
        },
        options: {
            viewInclude: [
                {
                    model: SubscriptionFee,
                    required: false,
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
                                    model: Coordinate,
                                    where: {
                                        label: 'Email nouvelles'
                                    }
                                },
                                { model: Establishment, as: 'establishment' }
                            ]
                        }
                    ]
                }
            ]
        }
    }
);

route.get('/last-year-subscription-fees', async (req, res) => {
    try {
        const data = await SubscriptionParams.findAll();

        let years = data?.map((e) => moment(e?.year.split('-')[0]).local());

        let lastYear = `${moment.max(years).format('YYYY')}-${moment
            .max(years)
            .add(1, 'year')
            .year()}`;

        res.status(200).json(lastYear);
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/check-missing-subscription-fees', async (req, res) => {
    try {
        const data = await SubscriptionParams.findAll();

        let years = data?.map((e) => moment(e?.year.split('-')[0]).local());

        let lastYear = `${moment.max(years).format('YYYY')}-${moment
            .max(years)
            .add(1, 'year')
            .year()}`;

        const subscriptionParams = await SubscriptionParams.findOne({ where: { year: lastYear } });

        const subscriptionFees = await SubscriptionFee.findAll({
            where: {
                subscriptionFeeParamsId: {
                    [Op.eq]: subscriptionParams?.id
                }
            }
        });

        const organizationIncluded = await Organization.findAll({
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
                { model: Establishment, required: true, as: 'establishment' },
                { model: CapacityHistory }
            ]
        });

        const subscriptionFeesLength = subscriptionFees?.length;

        const orgLength = organizationIncluded?.length;

        if (subscriptionFeesLength < orgLength) {
            return res.status(200).json({ isMissing: true, lastYear });
        } else {
            return res.status(200).json({ isMissing: false, lastYear });
        }
    } catch (e) {
        res.status(500).end();
    }
});

route.post('/create-missing-subscription-fees', async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const data = await SubscriptionParams.findAll();

        let years = data?.map((e) => moment(e?.year.split('-')[0]).local());

        let lastYear = `${moment.max(years).format('YYYY')}-${moment
            .max(years)
            .add(1, 'year')
            .year()}`;

        const subscriptionParams = await SubscriptionParams.findOne({ where: { year: lastYear } });

        const subscriptionFeeParamsId = subscriptionParams?.id;

        const subscriptionFees = await SubscriptionFee.findAll({
            where: {
                subscriptionFeeParamsId: {
                    [Op.eq]: subscriptionFeeParamsId
                }
            }
        });

        if (!subscriptionFees?.length) {
            const organizationIncluded = await Organization.findAll({
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
                    { model: Establishment, required: true, as: 'establishment' },
                    { model: CapacityHistory }
                ]
            });

            //create subscription fee for every establishment
            await Promise.all(
                organizationIncluded.map(async (e) => {
                    const capacityHistory = e?.capacityHistories?.find((a) => a.year == lastYear);

                    const calculatedAmount = amountCalculator(
                        capacityHistory || {},
                        subscriptionParams,
                        e?.establishment?.establishmentKey
                    );

                    await SubscriptionFee.create(
                        {
                            subscriptionFeeParamsId,
                            organizationId: e.id,
                            calculatedAmount,
                            status: 'Solde initial',
                            reminderCount:
                                subscriptionParams?.nextCall ===
                                "Appel immédiat (à l'enregistrement)"
                                    ? 1
                                    : 0
                        },
                        { transaction }
                    );
                })
            );
        } else {
            const orgIds = subscriptionFees?.map((e) => e?.organizationId);

            const organizationIncluded = await Organization.findAll({
                where: {
                    isArchived: 0,
                    id: {
                        [Op.notIn]: orgIds
                    }
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
                    { model: Establishment, required: true, as: 'establishment' },
                    { model: CapacityHistory }
                ]
            });

            //create subscription fee for every establishment
            await Promise.all(
                organizationIncluded.map(async (e) => {
                    const capacityHistory = e?.capacityHistories?.find((a) => a.year == lastYear);

                    const calculatedAmount = amountCalculator(
                        capacityHistory || {},
                        subscriptionParams,
                        e?.establishment?.establishmentKey
                    );

                    await SubscriptionFee.create(
                        {
                            subscriptionFeeParamsId,
                            organizationId: e.id,
                            calculatedAmount,
                            status: 'Solde initial',
                            reminderCount:
                                subscriptionParams?.nextCall ===
                                "Appel immédiat (à l'enregistrement)"
                                    ? 1
                                    : 0
                        },
                        { transaction }
                    );
                })
            );
        }

        await transaction.commit();

        res.status(200).json({ ok: true });
    } catch (e) {
        await transaction.rollback();
        res.status(500).end();
    }
});

route.get('/:id', auth(), async (req, res) => {
    const id = req.params.id;
    try {
        const data = await getUnpaidEstablishmentInfo(id);
        res.json(data);
    } catch (e) {
        res.status(500).end();
    }
});

route.post('/test-event/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await getUnpaidEstablishmentInfo(id);
        const mailModel = await Meta.findAll();
        const from =
            mailModel.find((f) => f?.name === 'relance_cotisation_de')?.value || config.email.from;
        const body = mailModel.find((f) => f?.name === 'relance_cotisation_modele')?.value;
        const subject = mailModel.find((f) => f?.name == 'relance_cotisation_sujet')?.value;
        await data?.establishments?.map(async (e) => {
            const { name, email } = e;
            if (email) {
                const html = body.replace('#NOM', name);
                const to = email;
                const msg = { from, to, subject, html };
                await queues.mail.add({ msg, establishmentId: e?.establishmentId });
            }
        });
        res.status(200).json({ status: true });
    } catch (e) {
        res.status(500).end();
    }
});

route.post('/send-subscription-fees/:id', auth(), async (req, res) => {
    const id = req.params.id;
    try {
        const data = await getUnpaidEstablishmentInfo(id);
        const mailModel = await Meta.findAll();
        const from =
            mailModel.find((f) => f?.name === 'relance_cotisation_de')?.value || config.email.from;
        const body = mailModel.find((f) => f?.name === 'relance_cotisation_modele')?.value;
        const subject = `Rappel de cotisations UNETP ${data?.year}`;
        await data?.establishments?.map(async (e) => {
            const { name, email } = e;
            if (email) {
                const html = body.replace('#NOM', name);
                const to = email;
                const msg = { from, to, subject, html };
                await queues.mail.add({ msg, establishmentId: e?.establishmentId });
            }
        });
        res.status(200).json({ status: true });
    } catch (e) {
        res.status(500).end();
    }
});

export default route;
