import express from 'express';
import moment from 'moment';
import { Op } from 'sequelize';

import yup from '../../lib/yup';
import auth from '../../middlewares/auth';
import models from '../../models/index';
import Network from '../../models/Network';
import Organization from '../../models/Organization';
import { establishmentSchema } from '../../schemas/advancedSearch';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';
const {
    Access,
    Function,
    SubscriptionFeePaymentRef,
    SubscriptionPayment,
    User,
    Department,
    SubscriptionParams,
    SubscriptionFee,
    Establishment,
    FunctionLabel,
    Coordinate,
    Civility,
    Country,
    Delegation,
    OrganizationType
} = models;
const route = express.Router();
const sortMapEstab = {
    'coordinate.zipCode': { models: [Organization, Coordinate], field: 'zipCode' },
    'organization.headmaster': { models: [Organization, Function, User], field: 'firstName' },
    'organization.name': { models: [Organization], field: 'name' },
    'organization.updatedAt': { models: [Organization], field: 'updatedAt' }
};
const sortMapUser = {
    'coordinate.city': { models: [Coordinate], field: 'city' },
    'department.departmentCode': {
        models: [Function, Organization, Establishment, Department],
        field: 'departmentCode'
    }
};
const sortMapOrg = {
    'organizationType.label': { models: [OrganizationType], field: 'label' }
};

route.get('/head-masters', async (req, res) => {
    const params = extractParamsFromRequest(req);
    const filters = params.filters;
    const { startDate, endDate } = filters;
    try {
        let userIncluded = new Set();
        const data = await Function.findAll({
            where:
                startDate || endDate
                    ? {
                          startDate:
                              startDate && endDate
                                  ? {
                                        [Op.between]: [startDate, endDate]
                                    }
                                  : startDate
                                  ? { [Op.gte]: startDate }
                                  : { [Op.lte]: endDate }
                      }
                    : undefined,
            include: [
                {
                    model: FunctionLabel,
                    where: {
                        isHeadMaster: true,
                        singularMaleName: {
                            [Op.notLike]: 'comptable'
                        }
                    }
                }
            ]
        });
        if (data) data.map((e) => userIncluded.add(e.userId));
        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapUser[params.sortBy] || params.sortBy
                },
                sortableFields: [
                    'id',
                    'lastName',
                    'firstName',
                    'coordinate.city',
                    'updatedAt',
                    'department.departmentCode'
                ],
                searchableFields: [],
                filterOptions: {
                    startDate: yup.date(),
                    endDate: yup.date(),
                    role: yup.mixed()
                },
                filterTransformation: (v) => {
                    delete v.startDate;
                    delete v.endDate;
                    delete v.role;
                    return v;
                },
                internalFields: User.internalFields,
                collection: User,
                distinct: true,
                baseQuery: {
                    isDeleted: 0,
                    isArchived: 0,
                    id: { [Op.in]: [...userIncluded] }
                },
                include: [
                    { model: Coordinate, include: Country },

                    {
                        model: Access,
                        required: true,
                        where:
                            typeof filters.role !== 'undefined'
                                ? {
                                      role: JSON.parse(filters.role) ? { [Op.not]: null } : null
                                  }
                                : undefined
                    },
                    {
                        model: Function,
                        where:
                            startDate || endDate
                                ? {
                                      startDate:
                                          startDate && endDate
                                              ? {
                                                    [Op.between]: [startDate, endDate]
                                                }
                                              : startDate
                                              ? { [Op.gte]: startDate }
                                              : { [Op.lte]: endDate }
                                  }
                                : undefined,
                        include: [
                            {
                                model: FunctionLabel
                            },
                            {
                                model: Organization,
                                include: {
                                    model: Establishment,
                                    as: 'establishment',
                                    include: Department
                                }
                            }
                        ]
                    }
                ]
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/users', auth(), async (req, res) => {
    try {
        const params = extractParamsFromRequest(req);
        const labels = params.filters.labels
            ? JSON.parse(params.filters.labels).map((e) => {
                  return {
                      [Op.like]: `%${e}`
                  };
              })
            : [];
        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapUser[params.sortBy] || params.sortBy
                },
                searchableFields: User.searchableFields,
                sortableFields: [
                    'id',
                    'lastName',
                    'firstName',
                    'coordinate.city',
                    'updatedAt',
                    'department.departmentCode'
                ],
                filterOptions: {},
                internalFields: User.internalFields,
                collection: User,
                baseQuery: params?.filters?.name?.length
                    ? {
                          isDeleted: 0,
                          [Op.or]: [
                              { firstName: { [Op.like]: `%${params.filters.name}%` } },
                              { lastName: { [Op.like]: `%${params.filters.name}%` } }
                          ]
                      }
                    : {
                          isDeleted: 0
                      },
                distinct: true,
                where: {
                    [Op.and]: {
                        isDeleted: 0
                    },
                    [Op.and]: {
                        isArchived: 0
                    }
                },
                include: [
                    { model: Civility },

                    {
                        required: labels?.length,
                        model: Coordinate,
                        include: Country,
                        where: labels
                            ? {
                                  label: {
                                      [Op.or]: labels
                                  }
                              }
                            : undefined
                    },
                    {
                        model: Function,
                        include: [
                            {
                                model: Organization,
                                include: {
                                    model: Establishment,
                                    as: 'establishment',
                                    include: Department
                                }
                            },
                            {
                                model: FunctionLabel
                            }
                        ]
                    }
                ]
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/delegates', auth(), async (req, res) => {
    let params = extractParamsFromRequest(req);
    const excludeDeputy = params?.filters?.excludeDeputy
        ? JSON.parse(params?.filters?.excludeDeputy)
        : undefined;
    try {
        let userIncluded = new Set();
        const data = await Function.findAll({
            include: {
                model: FunctionLabel,
                where: excludeDeputy
                    ? {
                          [Op.and]: [
                              {
                                  singularMaleName: {
                                      [Op.like]: 'Délégué académique%'
                                  }
                              },
                              {
                                  singularMaleName: {
                                      [Op.notLike]: 'Délégué académique adjoint%'
                                  }
                              }
                          ]
                      }
                    : {
                          organizationTypeId: 5
                      }
            }
        });
        if (data) data.map((e) => userIncluded.add(e.userId));
        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapUser[params.sortBy] || params.sortBy
                },
                searchableFields: ['firstName', 'lastName'],
                sortableFields: [
                    'id',
                    'lastName',
                    'firstName',
                    'coordinate.city',
                    'updatedAt',
                    'department.departmentCode'
                ],
                filterOptions: {
                    excludeDeputy: yup.boolean().required()
                },
                filterTransformation: (v) => {
                    delete v.excludeDeputy;
                    return v;
                },
                internalFields: User.internalFields,
                collection: User,
                distinct: true,
                baseQuery: {
                    isDeleted: 0,
                    isArchived: 0,
                    id: { [Op.in]: [...userIncluded] }
                },
                include: [
                    { model: Coordinate, include: Country },
                    {
                        model: Function,
                        include: [
                            { model: FunctionLabel },
                            {
                                model: Organization,
                                include: {
                                    model: Establishment,
                                    as: 'establishment',
                                    include: Department
                                }
                            }
                        ]
                    }
                ]
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/groups', auth(), async (req, res) => {
    try {
        const params = extractParamsFromRequest(req);
        const labels = params.filters.labels
            ? JSON.parse(params.filters.labels).map((e) => {
                  return {
                      [Op.like]: `%${e}`
                  };
              })
            : [];
        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapOrg[params.sortBy] || params.sortBy
                },
                sortableFields: ['id', 'name', 'updatedAt', 'typeId'],
                collection: Organization,
                filterOptions: {
                    labels: yup.array().of(yup.string())
                },
                filterTransformation: (v) => {
                    delete v.labels;
                    return v;
                },
                baseQuery: {
                    isDeleted: 0,
                    isArchived: 0,
                    name: {
                        [Op.like]: `%${params.filters.name || ''}%`
                    }
                },
                include: [
                    { model: OrganizationType },
                    {
                        required: false,
                        model: Network
                    },
                    {
                        required: false,
                        model: Establishment,
                        as: 'establishment',
                        include: Department
                    },
                    { required: false, model: Delegation },
                    {
                        required: labels.length,
                        model: Coordinate,
                        where: labels
                            ? {
                                  label: {
                                      [Op.or]: labels
                                  }
                              }
                            : undefined
                    }
                ]
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});
route.get('/members', auth(), async (req, res) => {
    try {
        const params = extractParamsFromRequest(req);
        let usersIncluded = new Set();
        const data = await Function.findAll({
            include: [
                {
                    model: FunctionLabel,
                    where: {
                        organizationTypeId: params?.filters?.organizationTypeId
                    }
                }
            ]
        });
        if (data) data.map((e) => usersIncluded.add(e.userId));
        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapUser[params.sortBy] || params.sortBy
                },
                searchableFields: User.searchableFields,
                sortableFields: [
                    'id',
                    'lastName',
                    'firstName',
                    'coordinate.city',
                    'updatedAt',
                    'department.departmentCode'
                ],
                filterOptions: {
                    organizationTypeId: yup.string().oneOf(['1', '2', '3']).trim()
                },
                filterTransformation: (v) => {
                    delete v.organizationTypeId;
                    return v;
                },
                internalFields: User.internalFields,
                collection: User,
                baseQuery: {
                    isDeleted: 0,
                    isArchived: 0,
                    id: { [Op.in]: [...usersIncluded] }
                },
                include: [
                    { model: Coordinate, include: Country },
                    {
                        model: Function,
                        include: [
                            {
                                model: FunctionLabel
                            },
                            {
                                model: Organization,
                                include: {
                                    model: Establishment,
                                    as: 'establishment',
                                    include: Department
                                }
                            }
                        ]
                    }
                ]
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/settlements', auth(), async (req, res) => {
    try {
        const currentYear =
            moment().month() < 9
                ? `${moment().subtract(1, 'year').year()}-${moment().year()}`
                : `${moment().year()}-${moment().add(1, 'year').year()}`;
        const params = extractParamsFromRequest(req);

        const data = await SubscriptionPayment.findAll({
            include: [
                {
                    model: SubscriptionFeePaymentRef,
                    where: params?.filters?.regulationType
                        ? {
                              paimentType: params.filters.regulationType
                          }
                        : undefined
                },
                {
                    model: SubscriptionFee,
                    required: true,
                    include: [
                        {
                            model: SubscriptionParams,
                            where: {
                                year: { [Op.like]: currentYear }
                            }
                        }
                    ]
                }
            ]
        });
        const organizationIncluded = new Set();
        data.map((e) => {
            organizationIncluded.add(e.subscriptionFee.organizationId);
        });

        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapEstab[params.sortBy] || params.sortBy
                },
                sortableFields: [
                    'id',
                    'establishmentKey',
                    'organization.name',
                    'coordinate.zipCode',
                    'organization.headmaster',
                    'organization.updatedAt'
                ],
                filterOptions: {
                    regulationType: yup.mixed()
                },
                filterTransformation: (v) => {
                    delete v.regulationType;
                    return v;
                },
                searchableFields: Establishment.searchableFields,
                internalFields: Establishment.internalFields,
                collection: Establishment,
                include: [
                    Department,
                    {
                        model: Organization,
                        as: 'organization',
                        duplicating: true,
                        attributes: ['name', 'updatedAt', 'id', 'isArchived'],
                        where: {
                            isDeleted: 0,
                            isArchived: 0,
                            id: { [Op.in]: [...organizationIncluded] }
                        },
                        include: [
                            {
                                model: Coordinate,
                                sperate: true
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
                ]
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});
route.get('/establishments', auth(), async (req, res) => {
    const params = extractParamsFromRequest(req);
    try {
        await establishmentSchema.validate(params.filters);

        const types = params?.filters?.types?.length
            ? JSON.parse(params?.filters?.types)?.map((e) => {
                  return {
                      [Op.like]: `%${e}`
                  };
              })
            : [];

        const status = params?.filters?.status?.length
            ? JSON.parse(params?.filters?.status)?.map((e) => {
                  return {
                      [Op.like]: `%${e}`
                  };
              })
            : [];

        const year = params?.filters?.year;

        let organizationIncluded = new Set();

        const fees = await SubscriptionFee.findAll({
            where: status?.length
                ? {
                      status: {
                          [Op.or]: status
                      }
                  }
                : undefined,

            include: {
                model: SubscriptionParams,
                where: {
                    year
                }
            }
        });

        if (fees) fees.map((e) => organizationIncluded.add(e.organizationId));

        res.json(
            await queryCollection({
                params: {
                    ...params,
                    sortBy: sortMapEstab[params.sortBy] || params.sortBy
                },
                sortableFields: [
                    'id',
                    'establishmentKey',
                    'organization.name',
                    'coordinate.zipCode',
                    'organization.headmaster',
                    'organization.updatedAt'
                ],
                searchableFields: [],
                filterOptions: {
                    types: yup.array().of(yup.string()),
                    status: yup.array().of(yup.string()),
                    year: yup.string()
                },
                filterTransformation: (v) => {
                    delete v.types;
                    delete v.status;
                    delete v.year;
                    return v;
                },
                internalFields: Establishment.internalFields,
                collection: Establishment,
                distinct: true,
                baseQuery: types?.length
                    ? {
                          establishmentKey: {
                              [Op.or]: types
                          }
                      }
                    : undefined,

                include: [
                    Department,
                    {
                        model: Organization,
                        as: 'organization',
                        duplicating: true,
                        attributes: ['name', 'updatedAt', 'id', 'isArchived'],
                        where: {
                            isDeleted: 0,
                            isArchived: 0,
                            id: {
                                [Op.in]: [...organizationIncluded]
                            }
                        },
                        include: [
                            {
                                model: Coordinate,
                                sperate: true
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
                                include: {
                                    model: SubscriptionParams
                                },
                                separate: true
                            }
                        ]
                    }
                ]
            })
        );
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

export default route;
