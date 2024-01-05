/* eslint-disable no-constant-condition */
import ExcelJS from 'exceljs';
import express from 'express';
import moment from 'moment';
import { Op } from 'sequelize';
import Sequelize from 'sequelize';

import establishmentController from '../../controllers/establishment.controller';
import sequelize from '../../db';
import yup from '../../lib/yup';
import auth from '../../middlewares/auth';
import HistoryType from '../../models/HistoryType';
import models from '../../models/index';
import OrganizationType from '../../models/OrganizationType';
import {
    editEstablishementAdminSchema,
    editEstablishementSchema,
    establishmentAdminSchema,
    establishmentSchema
} from '../../schemas/establishment';
import { calculateSystemPaySignature } from '../../utils/crypto';
import generateCRUD from '../../utils/generateCRUD';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';

const {
    Delegation,
    Request,
    Establishment,
    Organization,
    User,
    Coordinate,
    Function,
    FunctionLabel,
    Civility,
    EstablishmentHasDiploma,
    Diploma,
    Academy,
    Department,
    SubscriptionFee,
    SubscriptionParams,
    History,
    Guardianship,
    Country,
    OrganizationHasCountryPartner,
    OrganizationHasEstablishmentLabel,
    OrganizationHasCountryPairing,
    CapacityHistory,
    UnionSubscriptionFees,
    Pension,
    EstablishmentLabel
} = models;

const route = express.Router();
const sortMap = {
    'coordinate.zipCode': { models: [Organization, Coordinate], field: 'zipCode' },
    'organization.headmaster': { models: [Organization, Function, User], field: 'firstName' },
    'organization.name': { models: [Organization], field: 'name' },
    'organization.updatedAt': { models: [Organization], field: 'updatedAt' }
};

route.put('/establishments-for-add', auth(), async (req, res) => {
    try {
        const organizations = await Function.findAll({
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
                            model: Establishment,
                            as: 'establishment',
                            include: Department
                        }
                    ]
                }
            ]
        });
        const groupedOrganizations = organizations?.reduce((acc, cv) => {
            if (acc[cv?.organization?.establishment?.establishmentNumber]) {
                acc[cv?.organization?.establishment?.establishmentNumber].nodes = [
                    ...acc[cv?.organization?.establishment?.establishmentNumber].nodes,
                    cv
                ];
            } else {
                acc[cv?.organization?.establishment?.establishmentNumber] = {
                    nodes: [cv]
                };
            }
            return acc;
        }, {});
        const entries = Object.entries(groupedOrganizations || {});
        const nodes = entries?.map(([{ nodes }]) => {
            return nodes;
        });
        const establishmentEndings = nodes.map((item) => {
            var establishmentKeyEndings = [];
            item.map((e) => {
                const establishmentKey = e?.organization?.establishment?.establishmentKey;
                const key = establishmentKey.charAt(establishmentKey.length - 1);
                establishmentKeyEndings.push(key);
            });
            return establishmentKeyEndings;
        });
        const establishmentNames = establishmentEndings.map((e) => {
            var establishmentName = [];
            if (e.includes('0')) {
                if (!e.includes('1')) {
                    establishmentName = [...establishmentName, 'CFA/UFA'];
                }
                if (!e.includes('2')) {
                    establishmentName = [...establishmentName, 'CFC/CFP'];
                }
            } else if (e.includes('3') && !e.includes('2')) {
                establishmentName = ['CFC/CFP'];
            } else if (e.includes('4') && !e.includes('1')) {
                establishmentName = ['CFA/UFA'];
            } else {
                establishmentName = [];
            }
            return establishmentName;
        });
        res.json({ groupedOrganizations, establishmentNames });
    } catch (e) {
        res.status(500).end();
    }
});

route.post('/update-capacity-history', async (req, res) => {
    const { capacityHistories } = req?.body || {};
    const transaction = await sequelize.transaction();
    try {
        capacityHistories.map(async (e) => {
            const {
                id,
                organizationId,
                year,
                apprenticesCount,
                internsHoursCount,
                collegeContractStudentsCount,
                lpContractStudentsCount,
                lgtContractStudentsCount,
                btsContractStudentsCount,
                supContractStudentsCount,
                otherContractStudentsCount,
                withoutContractLpStudentsCount,
                withoutContractLgtStudentsCount,
                withoutContractBtsStudentsCount,
                withoutContractSupStudentsCount,
                withoutContractOtherStudentsCount,
                studentEmployerCount,
                cfaUfaApprenticesCount,
                cfpCfcInternsHoursCount
            } = e;

            await CapacityHistory.upsert(
                {
                    id,
                    organizationId,
                    year,
                    apprenticesCount,
                    internsHoursCount,
                    collegeContractStudentsCount,
                    lpContractStudentsCount,
                    lgtContractStudentsCount,
                    btsContractStudentsCount,
                    supContractStudentsCount,
                    otherContractStudentsCount,
                    withoutContractLpStudentsCount,
                    withoutContractLgtStudentsCount,
                    withoutContractBtsStudentsCount,
                    withoutContractSupStudentsCount,
                    withoutContractOtherStudentsCount,
                    studentEmployerCount,
                    cfaUfaApprenticesCount,
                    cfpCfcInternsHoursCount
                },
                { transaction }
            );
        });
        await transaction.commit();
        res.status(200).json({ ok: true });
    } catch (e) {
        await transaction.rollback();
        res.status(500).end();
    }
});

route.get('/establishment-without-ogec', auth(), async (req, res) => {
    const establishmentKeyEndings = ['1', '2'];

    try {
        const userFunctions = await Function.findAll({
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
                            model: Establishment,
                            as: 'establishment',
                            include: Department
                        }
                    ]
                }
            ]
        });
        const userEstablishment = await Promise.all(
            userFunctions.map(async (e) => {
                const {
                    ogecAddress,
                    ogecPhoneNumber,
                    ogecName,
                    ogecCity,
                    ogecEmail,
                    establishmentKey
                } = e?.organization.establishment || {};
                const data = await Request.findOne({
                    where: {
                        objectType: 'establishment',
                        objectName: 'ogec',
                        objectId: e?.organization?.establishment?.id
                    }
                });
                return {
                    organization: e.organization,
                    ogecValid:
                        data ||
                        (ogecAddress?.length &&
                            ogecPhoneNumber?.length &&
                            ogecName?.length &&
                            ogecCity?.length &&
                            ogecEmail?.length),
                    establishmentKeyValid: establishmentKeyEndings.includes(
                        establishmentKey?.charAt(establishmentKey.length - 1)
                    )
                };
            })
        );
        const establishmentInlcuded = userEstablishment?.filter(
            (e) => !e.ogecValid && !e.establishmentKeyValid
        );
        res.json(establishmentInlcuded);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

route.post('/submit-ogec-info', auth(), async (req, res) => {
    const establishments = req.body;

    const schema = {
        establishmentId: yup.string(),
        ogecName: yup.string().label('Nom').required(),
        ogecAddress: yup.string().label('Code postal').required(),
        ogecPhoneNumber: yup
            .string()
            .transform((v) =>
                v
                    ?.split(' ')
                    .filter((e) => !!e?.trim().length)
                    .join('')
                    .replaceAll('x', '')
            )
            .length(10)
            .label('Numéro de téléphone')
            .required()
            .nullable(),
        ogecEmail: yup.string().email().label('E-mail').required(),
        ogecCity: yup.string().label('Ville').required().nullable()
    };

    const now = new Date();
    const transaction = await sequelize.transaction();

    try {
        establishments?.map(async (e) => {
            const ogecFields = Object.keys(e);

            const objectSchema = ogecFields.reduce((acc, cv) => {
                return { ...acc, [cv]: schema[cv] };
            }, {});

            const updateOgec = yup.object(objectSchema);

            return await updateOgec.validate(e);
        });
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
        return;
    }

    const userFunctions = await Function.findAll({
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
                        model: Establishment,
                        as: 'establishment',
                        include: Department
                    }
                ]
            }
        ]
    });
    const userEstablishments = userFunctions?.map((e) => e?.organization?.establishment?.id);
    if (!establishments?.find((e) => userEstablishments?.includes(e.establishmentId))) {
        res.status(404).status({ message: 'Établissement non trouvée' });
    }
    try {
        await Promise.all(
            establishments.map(
                async ({
                    establishmentId,
                    ogecName,
                    ogecAddress,
                    ogecPhoneNumber,
                    ogecCity,
                    ogecEmail
                }) => {
                    await Request.create(
                        {
                            userId: req?.user?.profile?.id,
                            json: JSON.stringify({
                                ogecName,
                                ogecAddress,
                                ogecPhoneNumber,
                                ogecCity,
                                ogecEmail
                            }),
                            objectType: 'establishment',
                            objectName: 'ogec',
                            objectId: establishmentId,
                            createdAt: now
                        },
                        { transaction }
                    );
                }
            )
        );
        await transaction.commit();
        res.status(200).json({ status: true });
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).end();
    }
});

route.get('/availability/by-name/:name', auth(), async (req, res) => {
    try {
        const { exclude } = req?.query || {};
        const { name } = req?.params || {};
        const type = await OrganizationType.findOne({
            where: {
                label: 'Etablissement'
            }
        });
        const options = {
            where: {
                name,
                typeId: type.id
            }
        };

        if (exclude?.length) {
            options.where.id = exclude;
            const organization = await Organization.findOne(options);

            // if unique
            if (organization) {
                return res.json({
                    errorCode: null,
                    data: {
                        isAvailable: !!organization
                    }
                });
            } else if (organization === null) {
                return res.json({
                    errorCode: null,
                    data: {
                        isAvailable: !organization
                    }
                });
            }
        } else {
            const organization = await Organization.findOne(options);

            return res.json({
                errorCode: null,
                data: {
                    isAvailable: !organization
                }
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            errorCode: null,
            data: {
                message: e.message,
                isAvailable: false
            }
        });
    }
});

route.get('/availability/by-key/:establishmentKey', auth(), async (req, res) => {
    try {
        const { exclude } = req?.query || {};
        const { establishmentKey } = req?.params || {};
        const options = {
            where: {
                establishmentKey
            }
        };
        if (exclude?.length) {
            options.where.id = {
                [Op.ne]: exclude
            };
        }
        const establishment = await Establishment.findOne(options);
        res.json({
            errorCode: null,
            data: {
                isAvailable: !establishment
            }
        });
    } catch (e) {
        res.json({
            errorCode: null,
            data: {
                message: e.message,
                isAvailable: false
            }
        });
    }
});

const xlsxTransformer = (node) => {
    const coordinate = node?.organization?.coordinates?.find((e) => e.isDefault);
    const {
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
        cedex,
        country,

        city
    } = coordinate || {};
    return [
        'Etablissement',
        node?.organization?.name,
        node?.organization?.description,
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
        node?.department?.departmentCode,
        city,
        cedex,
        country?.label
    ];
};

route.get('/export', auth({ action: 'export', subject: 'establishment' }), async (req, res) => {
    try {
        const params = extractParamsFromRequest(req);
        const { filters } = params;
        const { nodes } = await queryCollection({
            collection: Establishment,
            searchableFields: ['establishmentKey', 'establishmentNumber'],
            sortableFields: [
                'id',
                'establishmentKey',
                'organization.name',
                'coordinate.zipCode',
                'organization.headmaster'
            ],
            filterOptions: Establishment.filterOptions,
            sortByTransformation: (sort) => {
                return sortMap[sort] || sort;
            },
            params: extractParamsFromRequest(req),
            include: [
                {
                    model: Department,
                    where: {
                        [Op.and]: {
                            departmentCode: {
                                [Op.like]: `%${filters?.departmentNumber || ''}%`
                            }
                        }
                    }
                },
                {
                    model: Organization,
                    attributes: ['name', 'updatedAt', 'id', 'isArchived'],
                    where:
                        typeof filters.isArchived !== 'undefined'
                            ? {
                                  [Op.and]: {
                                      name: {
                                          [Op.like]: `%${filters?.name ? filters?.name : ''}%`
                                      },
                                      isArchived: {
                                          [Op.like]: filters?.isArchived
                                      }
                                  }
                              }
                            : {
                                  [Op.and]: {
                                      name: {
                                          [Op.like]: `%${filters?.name ? filters?.name : ''}%`
                                      }
                                  }
                              },
                    as: 'organization',
                    include: [
                        {
                            model: Coordinate,
                            attributes: [
                                'zipCode',
                                'label',
                                'phoneNumber',
                                'fax',
                                'mobileNumber',
                                'email',
                                'website',
                                'recipient',
                                'additionalRecipient',
                                'addressLine1',
                                'voiceNumber',
                                'voiceLabel',
                                'addressLine3',
                                'city',
                                'cedex',
                                'isDefault'
                            ],
                            include: Country,
                            where: filters?.city
                                ? {
                                      [Op.or]: {
                                          city: {
                                              [Op.like]: `%${filters?.city || ''}%`
                                          },
                                          zipCode: {
                                              [Op.like]: `%${filters?.city || ''}%`
                                          }
                                      }
                                  }
                                : undefined
                        }
                    ]
                }
            ],

            filterTransformation: (filters) => {
                delete filters.departmentNumber;
                delete filters?.isArchived;
                delete filters?.name;
                delete filters?.organizationType;
                delete filters?.city;
                return filters;
            }
        });

        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        const workbook = new ExcelJS.Workbook();
        const ws = workbook.addWorksheet();
        const header = [
            'type_structure',
            'nom',
            'description',
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

const estabSchema = (req) => {
    if (req?.user?.role === 100) {
        return establishmentAdminSchema;
    } else if (req?.user?.role === 0 || 300) {
        return establishmentSchema;
    } else {
        return establishmentSchema;
    }
};

const editEstabSchema = (req) => {
    if (req?.user?.role === 100) {
        return editEstablishementAdminSchema;
    } else if (req?.user?.role === 0 || 300) {
        return editEstablishementSchema;
    } else {
        return editEstablishementSchema;
    }
};

generateCRUD(
    route,
    Establishment,
    'establishment',
    'establishments',
    estabSchema,

    {
        createFunction: async (item, transaction) => {
            await establishmentController.create({ payload: item, transaction });
        },
        updateFunction: async (id, item, transaction) => {
            await establishmentController.update({ id, payload: item, transaction });
        },
        deleteFunction: async (id, transaction) => {
            const oldEstablishment = await Establishment.findOne({
                where: { id },
                include: [
                    {
                        model: Organization,
                        as: 'organization'
                    }
                ]
            });

            const { organizationId } = oldEstablishment;

            await Organization.update(
                {
                    isArchived: true
                },
                {
                    where: {
                        id: organizationId
                    }
                },
                { transaction }
            );
        },
        queryCollection: {
            ignoreSearch: true,
            searchableFields: [],
            sortableFields: [
                'id',
                'establishmentKey',
                'organization.name',
                'coordinate.zipCode',
                'organization.headmaster',
                'organization.updatedAt'
            ],
            filterOptions: Establishment.filterOptions,
            sortByTransformation: (sort) => {
                return sortMap[sort] || sort;
            },
            include: (_, filters) => {
                const organizationWhere = {};
                if (typeof filters?.isArchived !== 'undefined') {
                    organizationWhere.isArchived = {
                        [Op.like]: filters?.isArchived
                    };
                }
                if (typeof filters?.name !== 'undefined') {
                    organizationWhere.name = {
                        [Op.like]: `%${filters?.name}%`
                    };
                }
                return [
                    {
                        model: Department,
                        where: filters?.departmentNumber?.length
                            ? {
                                  [Op.and]: {
                                      departmentCode: {
                                          [Op.like]: `%${filters?.departmentNumber || ''}%`
                                      }
                                  }
                              }
                            : {}
                    },
                    {
                        duplicating: true,
                        model: Organization,
                        attributes: ['name', 'updatedAt', 'id', 'isArchived'],
                        where:
                            typeof filters.isArchived !== 'undefined'
                                ? {
                                      [Op.and]: {
                                          name: {
                                              [Op.like]: `%${filters?.name ? filters?.name : ''}%`
                                          },
                                          isArchived: {
                                              [Op.like]: filters?.isArchived
                                          }
                                      }
                                  }
                                : {
                                      [Op.and]: {
                                          name: {
                                              [Op.like]: `%${filters?.name ? filters?.name : ''}%`
                                          }
                                      }
                                  },
                        as: 'organization',
                        include: [
                            {
                                model: Coordinate,
                                attributes: ['zipCode', 'city'],
                                where: filters?.city
                                    ? {
                                          [Op.or]: {
                                              city: {
                                                  [Op.like]: `%${filters?.city || ''}%`
                                              },
                                              zipCode: {
                                                  [Op.like]: `%${filters?.city || ''}%`
                                              }
                                          }
                                      }
                                    : undefined
                            },
                            {
                                model: Function,
                                separate: false,
                                attributes: ['id'],
                                include: [
                                    {
                                        model: FunctionLabel,
                                        attributes: [
                                            'isHeadMaster',
                                            'singularMaleName',
                                            'singularFemaleName',
                                            'id'
                                        ],
                                        where: {
                                            id: {
                                                [Op.in]: [1, 2, 3, 6, 7, 156, 115, 7, 155]
                                            }
                                        }
                                    },
                                    {
                                        model: User,
                                        attributes: ['id', 'firstName', 'lastName'],
                                        include: {
                                            model: Civility,
                                            attributes: ['abbreviation', 'gender']
                                        }
                                    }
                                ]
                            },
                            {
                                model: SubscriptionFee,
                                include: SubscriptionParams,
                                separate: true
                            }
                        ]
                    }
                ];
            },
            baseQuery: async (_, filters, { search } = {}) => {
                if (search?.length) {
                    const orgs = await sequelize.query(
                        `SELECT * FROM etablissement join unitorg on etablissement.id_unitorg = unitorg.id_unitorg WHERE MATCH(numero_etablissement,cle_etablissement)
                            AGAINST('${search}' IN NATURAL LANGUAGE MODE) or MATCH(nom) AGAINST('${search}' IN NATURAL LANGUAGE MODE)
                    `
                    );

                    const organizationIds = orgs
                        ?.filter((e) => e?.length)
                        .map((e) => e[0].id_unitorg);
                    return {
                        id_unitorg: {
                            [Op.in]: organizationIds
                        }
                    };
                }
                return {};
            },
            filterTransformation: async (filters) => {
                delete filters.departmentNumber;
                delete filters?.isArchived;
                delete filters?.name;
                delete filters?.organizationType;
                delete filters?.city;
                if (filters?.establishmentKey) {
                    filters.establishmentKey = {
                        [Op.like]: `%${filters?.establishmentKey}%`
                    };
                } else {
                    delete filters?.establishmentKey;
                }
                if (filters?.establishmentNumber) {
                    filters.establishmentNumber = {
                        [Op.like]: `%${filters?.establishmentNumber}%`
                    };
                } else {
                    delete filters?.establishmentNumber;
                }
                return filters;
            }
        },
        guards: {
            list: auth({ action: 'list', subject: 'establishment' }),
            view: auth({ action: 'view', subject: 'establishment' }),
            create: auth({ action: 'create', subject: 'establishment' }),
            write: auth({ action: 'write', subject: 'establishment' }),
            delete: auth({ action: 'delete', subject: 'establishment' }),
            restore: auth({ action: 'restore', subject: 'establishment' })
        },
        updateSchema: editEstabSchema,
        options: {
            viewInclude: [
                { model: Organization, as: 'delegation', include: Delegation },
                {
                    model: Academy
                },
                { model: Department },
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['name', 'createdAt', 'id'],
                    required: false,

                    include: [
                        {
                            model: CapacityHistory,
                            order: [['year', 'DESC']],
                            required: false,
                            separate: true
                        },
                        {
                            model: EstablishmentHasDiploma,
                            include: Diploma,
                            required: false
                        },
                        {
                            model: Guardianship,
                            required: false
                        },
                        {
                            model: History,
                            where: {
                                [Op.or]: [
                                    {
                                        historyIdType: 3,
                                        date: {
                                            [Op.gte]: new Date('01-01-2022')
                                        }
                                    },
                                    {
                                        historyIdType: {
                                            [Op.ne]: 3
                                        }
                                    }
                                ]
                            },

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
                            include: [
                                {
                                    model: HistoryType,
                                    where: {
                                        label: {
                                            [Op.not]: 'e-mailing'
                                        }
                                    }
                                },
                                {
                                    model: User,
                                    include: [Civility]
                                }
                            ]
                        },
                        Pension,
                        {
                            model: OrganizationHasEstablishmentLabel,
                            include: [EstablishmentLabel]
                        },
                        {
                            model: Function,
                            include: [
                                {
                                    model: User,
                                    include: [Civility, Coordinate]
                                },
                                FunctionLabel
                            ]
                        },
                        Country,
                        {
                            model: Coordinate,
                            include: Country
                        },
                        {
                            model: Organization,
                            as: 'childrenOrganizations'
                        },
                        {
                            model: OrganizationHasCountryPartner,
                            include: Country
                        },
                        {
                            model: OrganizationHasCountryPairing,
                            include: Country
                        },
                        {
                            model: SubscriptionFee,
                            order: [['subscriptionFeeParamsId', 'DESC']],
                            required: false,
                            separate: true,
                            include: [
                                { model: SubscriptionParams, required: false },
                                { model: UnionSubscriptionFees, required: false }
                            ]
                        }
                    ]
                }
            ],
            viewAttributes: [
                'id',
                'numAcadLT',
                'numAcadLP',
                'numAcadCFA',
                'numExistanceCFP',
                'establishmentNumber',
                'establishmentKey',
                'relationship',
                'comments',
                'privateComment',
                'accessDate',
                'mixed',
                'ogecName',
                'ogecAddress',
                'ogecPhoneNumber',
                'ogecEmail',
                'ogecCity'
            ]
        }
    }
);

route.post('/restore/:id', async (req, res) => {
    const { id } = req.params;

    const transaction = await sequelize.transaction();
    const oldEstablishment = await Establishment.findOne({
        where: { id },
        include: [
            {
                model: Organization,
                as: 'organization'
            }
        ]
    });

    const { organizationId } = oldEstablishment;

    if (oldEstablishment?.organization?.isArchived) {
        try {
            await Organization.update(
                {
                    isArchived: false
                },
                {
                    where: {
                        id: organizationId
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
        res.status(400).json({ message: 'Établissement non archivé!' });
    }
});
route.post('/test-pay', async (req, res) => {
    const time = moment().add(1, 'hours').format('YYYYMMDDHHmmss');
    const fields = {
        vads_action_mode: 'INTERACTIVE',
        vads_amount: '5124',
        vads_ctx_mode: 'TEST',
        vads_currency: '978',
        vads_page_action: 'PAYMENT',
        vads_payment_config: 'SINGLE',
        vads_site_id: '55976207',
        vads_trans_date: time,
        vads_trans_id: 'CXTEEE',
        vads_version: 'V2'
    };
    res.json({
        ...fields,
        signature: calculateSystemPaySignature({ fields, key: 'X7qPGB9xTDjtQMKd' })
    });
});

export default route;
