import { hashSync } from 'bcrypt';
import ExcelJS from 'exceljs';
import express from 'express';
import fs from 'fs';
import moment from 'moment';
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import Sequelize from 'sequelize';

import config from '../../config/secrets';
import sequelize from '../../db';
import auth from '../../middlewares/auth';
import Access from '../../models/Access';
import CapacityHistory from '../../models/CapacityHistory';
import Civility from '../../models/Civility';
import Coordinate from '../../models/Coordinate';
import Country from '../../models/Country';
import Delegation from '../../models/Delegation';
import Department from '../../models/Department';
import Establishment from '../../models/Establishment';
import Function from '../../models/Function';
import FunctionLabel from '../../models/FunctionLabel';
import History from '../../models/History';
import HistoryType from '../../models/HistoryType';
import Network from '../../models/Network';
import Organization from '../../models/Organization';
import OrganizationType from '../../models/OrganizationType';
import SubscriptionFee from '../../models/SubscriptionFee';
import SubscriptionParams from '../../models/SubscriptionParams';
import UnionSubscriptionFees from '../../models/UnionSubscriptionFees';
import User from '../../models/User';
import userSchema from '../../schemas/user';
import { getUniqueUsername } from '../../utils/auth';
import generateCRUD from '../../utils/generateCRUD';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';
import { getCurrentYear, getLastThreeYears } from '../../utils/time';

const { avatarsPath } = config;
const transport = nodemailer.createTransport(config.email.smtp);

const router = express.Router();

const sortMap = {
    'coordinate.city': { models: [Coordinate], field: 'city' },
    'department.departmentCode': {
        models: [Function, Organization, Establishment, Department],
        field: 'departmentCode'
    }
};

const xlsxTransformer = (node) => {
    let object = [
        node?.civility?.abbreviation,
        node?.lastName,
        node?.firstName,
        node?.gender,
        node?.comment
    ];
    const coordinate = node?.coordinates?.find((e) => e.isDefault);
    if (coordinate) {
        const {
            label,
            phoneNumber,
            fax,
            email,
            website,
            mobileNumber,
            recipient,
            additionalRecipient,
            addressLine1,
            voiceNumber,
            voiceLabel,
            addressLine3,
            zipCode,
            city,
            cedex,
            country
        } = coordinate;
        const currentFunction = node?.functions?.find(
            (e) =>
                (e.startDate ? moment().isAfter(moment(e.startDate)) : true) &&
                (e.endDate ? moment().isBefore(moment(e.endDate)) : true)
        );
        object = [
            ...object,
            label,
            phoneNumber,
            fax,
            mobileNumber,
            email,
            website,
            recipient,
            additionalRecipient,
            addressLine1,
            voiceNumber,
            voiceLabel,
            addressLine3,
            zipCode,
            currentFunction?.organization?.establishment?.department?.departmentCode,
            city,
            cedex,
            country?.label
        ];
    }
    return object;
};

router.get('/export', auth({ action: 'export', subject: 'user' }), async (req, res) => {
    try {
        const params = extractParamsFromRequest(req);
        const { filters } = params;
        const { nodes } = await queryCollection({
            collection: User,
            searchableFields: ['id', 'firstName', 'lastName', 'birthName'],
            sortableFields: ['id', 'lastName'],
            internalFields: User.internalFields,
            params: extractParamsFromRequest(req),
            baseQuery: {
                isDeleted: false
            },
            include: [
                { model: Coordinate, include: Country },
                Civility,
                {
                    model: Function,
                    where: filters?.functionLabel
                        ? {
                              labelId: filters?.functionLabel
                          }
                        : undefined,
                    include: [
                        {
                            model: FunctionLabel,
                            required: false,
                            where: filters?.organizationType
                                ? {
                                      organizationTypeId: filters?.organizationType
                                  }
                                : undefined
                        },
                        {
                            model: Organization,
                            required: false,
                            include: {
                                model: Establishment,
                                as: 'establishment',
                                include: Department
                            }
                        }
                    ]
                }
            ],
            filterTransformation: (filters) => {
                delete filters?.functionLabel;
                delete filters?.organizationType;
                return filters;
            }
        });
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        const workbook = new ExcelJS.Workbook();
        const ws = workbook.addWorksheet();
        const header = [
            'civilite',
            'nom',
            'prenom',
            'sexe',
            'commentaire',
            'libelle_coordonnee',
            'telephone',
            'fax',
            'mobile',
            'email',
            'site_web',
            'destinataire',
            'destinataire_complement',
            'adresse_ligne1',
            'numero_voie',
            'libelle_voie',
            'adresse_ligne3',
            'code_postal',
            'departement',
            'ville',
            'cedex',
            'pays'
        ];
        header.forEach((e, i) => {
            ws.getCell(`${String.fromCharCode(65 + i)}1`).value = e;
        });
        const rows = nodes.map(xlsxTransformer);
        rows.forEach((e, i) => {
            e.forEach((c, j) => {
                ws.getCell(`${String.fromCharCode(65 + j)}${i + 2}`).value = c;
            });
        });

        workbook.xlsx.write(res);
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/establishments-cotisation/:establishmentNumber', auth(), async (req, res) => {
    const { establishmentNumber } = req?.params || {};
    const currentYear = getCurrentYear();

    const organizations = await Organization.findAll({
        include: [
            {
                model: Coordinate,
                include: Country
            },
            {
                model: CapacityHistory,
                where: { year: currentYear },
                required: false
            },

            {
                model: SubscriptionFee,
                where: {
                    status: { [Op.ne]: 'Validé' }
                },
                include: { model: SubscriptionParams, where: { year: getCurrentYear() } }
            },
            {
                model: Establishment,
                as: 'establishment',
                where: { establishmentNumber: establishmentNumber },
                include: Department
            }
        ]
    });

    res.json(organizations);
});

router.get('/unpaid-establishments', auth(), async (req, res) => {
    const lastThreeYears = getLastThreeYears();
    try {
        const functions = await Function.findAll({
            where: { userId: req?.user?.profile?.id },
            include: [
                {
                    model: FunctionLabel,
                    where: { isHeadMaster: true }
                },
                {
                    model: Organization,

                    include: [
                        Coordinate,
                        {
                            model: SubscriptionFee,
                            include: {
                                model: SubscriptionParams,
                                where: {
                                    year: {
                                        [Op.in]: lastThreeYears
                                    }
                                }
                            },
                            where: {
                                status: 'Solde initial'
                            }
                        },
                        {
                            model: Establishment,
                            as: 'establishment',
                            include: Department
                        }
                    ]
                }
            ],
            order: [[Organization, SubscriptionFee, SubscriptionParams, 'year', 'desc']]
        });

        res.json(functions);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

generateCRUD(router, User, 'user', 'users', userSchema, {
    createFunction: async (item, transaction, req, res) => {
        const {
            functions,
            coordinates,
            histories,
            password,
            role,
            isDisabled,
            accessComment,
            ...rest
        } = item;
        const now = new Date();
        const { id: userId } = await User.create(
            { ...rest, isArchived: false, isDeleted: false, createdAt: now },
            { transaction }
        );
        const username = await getUniqueUsername(rest);
        const access = {
            userId,
            username,
            isDisabled,
            comment: accessComment,
            createdAt: now,
            role
        };
        if (password?.length) {
            access.password = hashSync(password, 8);
        }
        const { id: accessId } = await Access.create(access);
        await User.update(
            {
                accessId,
                updatedAt: now,
                role
            },
            {
                where: { id: userId },
                transaction
            }
        );
        await Promise.all(
            functions.map(async (e) => {
                await Function.create({ ...e, userId }, { transaction });
            })
        );
        await Promise.all(
            coordinates.map((e) =>
                Coordinate.create(
                    { ...e, userId, isDefault: false, createdAt: now },
                    { transaction }
                )
            )
        );

        await Promise.all(histories.map((e) => History.create({ ...e, userId }, { transaction })));
        const user = req?.body;
        if (user?.sendEnrollmentEmail === true) {
            const from = config.email.from;

            const subject = `Bienvenue à l'UNETP `;
            const html = `login : ${username}  , 
              mot de passe :   ${user?.password}`;

            try {
                const to = user?.coordinates[0]?.email;

                const msg = { from, to, subject, html };
                await transport.sendMail(msg);

                res.json({ ok: true });
            } catch (e) {
                res.status(500).end();
            }
        }
    },
    deleteFunction: async (id, transaction) => {
        await User.update(
            {
                isArchived: true
            },
            {
                where: {
                    id: id
                }
            },
            { transaction }
        );
    },
    updateFunction: async (id, item, transaction) => {
        const now = new Date();

        const {
            functions,
            coordinates,
            histories,
            password,
            subscriptionFees,
            role,
            isDisabled,
            ...rest
        } = item;
        const user = await User.findOne(
            {
                where: { id },
                include: [
                    Function,
                    Coordinate,
                    History,
                    { model: SubscriptionFee, include: SubscriptionParams }
                ]
            },
            { transaction }
        );
        if (user) {
            await User.update(
                {
                    ...rest,
                    updatedAt: now
                },
                {
                    where: { id },
                    transaction
                }
            );
            if (password?.length) {
                await Access.update(
                    {
                        password: hashSync(password, 8)
                    },
                    {
                        where: {
                            id: user?.get()?.accessId
                        },
                        transaction
                    }
                );
            }
            await Access.update(
                {
                    role,
                    isDisabled
                },
                {
                    where: {
                        id: user?.get()?.accessId
                    },
                    transaction
                }
            );
            await Promise.all(
                functions.map(async (e) => {
                    await Function.upsert({ ...e, userId: id }, { transaction });
                })
            );
            const newFunctionsIds = functions?.filter((e) => e.id)?.map((e) => e.id);
            await Promise.all(
                user
                    ?.get()
                    ?.functions?.filter((e) => !newFunctionsIds?.includes(e?.get().id))
                    ?.map((e) => e.destroy())
            );
            await Promise.all(
                coordinates.map((e) =>
                    Coordinate.upsert(
                        { ...e, userId: id, isDefault: false, updatedAt: now },
                        { transaction }
                    )
                )
            );
            const newCoordinatesIds = coordinates?.filter((e) => e.id)?.map((e) => e.id);
            await Promise.all(
                user
                    ?.get()
                    ?.coordinates?.filter((e) => !newCoordinatesIds?.includes(e?.get().id))
                    ?.map((e) => e.destroy())
            );
            //add /update hist
            await Promise.all(
                histories.map((e) => History.upsert({ ...e, userId: id }, { transaction }))
            );
            //destroy histroies
            const newHistoriesIds = histories?.filter((e) => e.id)?.map((e) => e.id);
            await Promise.all(
                user
                    ?.get()
                    ?.histories?.filter((e) => !newHistoriesIds?.includes(e?.get().id))
                    ?.map((e) => e.destroy())
            );
            const yearsExists = user?.subscriptionFees?.map((e) => e?.subscriptionParam?.year);
            await Promise.all(
                subscriptionFees
                    .filter((a) => {
                        return !yearsExists?.includes(a.subscriptionParam?.year);
                    })
                    .map(async ({ subscriptionParam, calculatedAmount, ...rest }) => {
                        const { id: subscriptionFeeParamsId, year } =
                            await SubscriptionParams.findOne({
                                where: {
                                    year: subscriptionParam?.year
                                }
                            });
                        if (subscriptionParam?.year === year) {
                            await SubscriptionFee.upsert(
                                {
                                    id: rest.id,
                                    userId: id,
                                    subscriptionFeeParamsId,
                                    calculatedAmount,
                                    status: 'Solde initial',
                                    reminderCount: 0
                                },
                                { transaction }
                            );
                        }
                    })
            );
        }
    },

    queryCollection: {
        searchableFields: ['firstName', 'lastName'],
        sortableFields: [
            'id',
            'lastName',
            'firstName',
            'coordinate.city',
            'updatedAt',
            'department.departmentCode'
        ],
        internalFields: User.internalFields,
        baseQuery: {
            isDeleted: false
        },
        where: (_, filters) => {
            return filters?.department
                ? {
                      'department.departmentCode': {
                          [Op.like]: filters?.department
                      }
                  }
                : undefined;
        },
        filterOptions: User.filterOptions,
        sortByTransformation: (sort) => {
            return sortMap[sort] || sort;
        },
        include: (_, filters) => {
            return [
                Access,
                Coordinate,
                Civility,
                {
                    model: History,
                    include: HistoryType
                },

                {
                    model: Function,
                    where: filters?.functionLabel
                        ? {
                              labelId: filters?.functionLabel
                          }
                        : undefined,
                    include: [
                        {
                            model: FunctionLabel,
                            required: false,
                            where: filters?.organizationType
                                ? {
                                      organizationTypeId: filters?.organizationType
                                  }
                                : undefined
                        },
                        {
                            model: Organization,
                            include: {
                                model: Establishment,
                                as: 'establishment',
                                include: {
                                    model: Department,
                                    required: true,
                                    where: filters?.organizationType
                                        ? {
                                              [Op.and]: {
                                                  departmentCode: {
                                                      [Op.like]: `%${filters?.department || ''}%`
                                                  }
                                              }
                                          }
                                        : undefined
                                }
                            }
                        }
                    ]
                }
            ];
        },
        filterTransformation: (filters) => {
            delete filters.functionLabel;
            delete filters?.organizationType;
            delete filters?.department;

            filters?.firstName?.length
                ? (filters['firstName'] = {
                      [Op.like]: `%${filters?.firstName}%`
                  })
                : delete filters.firstName;

            return filters;
        }
    },
    guards: {
        list: auth({ action: 'list', subject: 'user' }),
        view: auth({ action: 'view', subject: 'user' }),
        create: auth({ action: 'create', subject: 'user' }),
        write: auth({ action: 'write', subject: 'user' }),
        delete: auth({ action: 'delete', subject: 'user' })
    },
    withBaseRoute: true,
    options: {
        softDeleteField: 'isDeleted',

        viewInclude: [
            Coordinate,
            Civility,

            {
                model: SubscriptionFee,
                required: false,
                separate: true,
                include: [{ model: SubscriptionParams }, { model: UnionSubscriptionFees }]
            },

            {
                model: History,
                attributes: {
                    include: [
                        [
                            Sequelize.literal(
                                `COALESCE(\`history\`.date,\`history\`.date_debut,\`history\`.date_fin) `
                            ),
                            `finalDate`
                        ]
                    ]
                },
                order: [[sequelize.literal('finalDate'), 'DESC']],
                separate: true,
                required: true,
                include: [{ model: User, include: Civility }, HistoryType]
            },

            {
                model: Function,
                include: [
                    { model: User, include: Civility },
                    FunctionLabel,
                    {
                        model: Organization,
                        include: [
                            Delegation,
                            {
                                model: Network
                            },
                            OrganizationType,
                            {
                                required: false,
                                model: Establishment,
                                as: 'establishment',
                                include: Department
                            },
                            Coordinate
                        ]
                    }
                ]
            },
            Access
        ]
    }
});
router.post('/update-avatar', auth(), async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { avatar } = req?.files || {};
        const id = req.user?.profile?.id;
        const now = new Date();
        fs.writeFileSync(`${avatarsPath}/${id}.png`, avatar?.data);
        await User.update(
            {
                avatar: `${avatarsPath}/${id}.png`,
                updatedAt: now
            },
            {
                where: {
                    id
                }
            },
            { transaction: t }
        );
        await t.commit();
        res.end();
    } catch (e) {
        await t.rollback();
        res.status(500).end();
    }
});

router.post('/update-user', auth(), async (req, res) => {
    const t = await sequelize.transaction();
    const id = req.user?.profile?.id;
    const now = new Date();
    const data = req.body;
    const { lastName, firstName, comment, civilityId, relationship, dob, coordinates } = data;
    try {
        const user = await User.findOne(
            {
                where: { id },

                include: [Coordinate]
            },
            { transaction: t }
        );

        await User.update(
            {
                firstName,
                lastName,
                civilityId,
                relationship,
                dob,
                comment,

                updatedAt: now
            },
            {
                where: {
                    id
                }
            },
            { transaction: t }
        );

        await Promise.all(
            coordinates?.map(async ({ id: coordinateId, ...inf }) => {
                await Coordinate.upsert(
                    {
                        id: coordinateId,
                        userId: req.user?.profile?.id,
                        ...inf,
                        isDefault: false,
                        createdAt: now
                    },
                    { transaction: t }
                );
            })
        );

        const newCoordinatesIds = coordinates?.filter((e) => e.id)?.map((e) => e.id);
        await Promise.all(
            user
                ?.get()
                ?.coordinates?.filter((e) => !newCoordinatesIds?.includes(e?.get().id))
                ?.map((e) => e.destroy())
        );

        await t.commit();
        res.end();
    } catch (e) {
        console.log(e);
        await t.rollback();
        res.status(500).end();
    }
});

router.get('/avatar/:id', (req, res) => {
    try {
        const id = req.params.id;
        const avatar = `${avatarsPath}/${id}.png`;
        if (fs.existsSync(avatar)) {
            res.contentType('png');
            fs.createReadStream(avatar).pipe(res);
        } else {
            res.status(404).end();
        }
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/restore/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();

    const user = await User.findOne({
        where: { id }
    });

    const { isArchived } = user;

    if (isArchived) {
        try {
            await User.update(
                {
                    isArchived: false
                },
                {
                    where: {
                        id: id
                    }
                },
                { transaction }
            );
            await transaction.commit();
            res.status(200).json({ ok: true });
        } catch (e) {
            await transaction.rollback();
            res.status(500).end();
        }
    } else {
        res.status(400).json({ message: 'personne non archivée !' });
    }
});

router.post('/remove-archive', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const users = await User.findAll({
            where: {
                isArchived: true
            }
        });
        await Promise.all(
            users.map(async ({ id }) => {
                await User.destroy({
                    where: { id },
                    truncate: true
                });
            })
        );

        await transaction.commit();
        return res.status(200).json({ ok: true });
    } catch (e) {
        await transaction.rollback();

        if (e?.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(500).json({ message: 'SequelizeForeignKeyConstraintError' });
        } else {
            return res.status(500).json();
        }
    }
});

export default router;
