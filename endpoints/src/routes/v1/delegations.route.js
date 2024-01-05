import express from 'express';
import { Op } from 'sequelize';
import Sequelize from 'sequelize';

import sequelize from '../../db';
import auth from '../../middlewares/auth';
import models from '../../models/index';
import delegationSchema from '../../schemas/delegation';
import generateCRUD from '../../utils/generateCRUD';

const {
    Organization,
    Delegation,
    Coordinate,
    History,
    Function,
    User,
    FunctionLabel,
    HistoryType,
    Establishment,
    Civility,
    Department
} = models;
const route = express.Router();

const sortMap = {
    'organization.name': {
        models: [Organization],
        field: 'name'
    },
    'organization.updatedAt': {
        models: [Organization],
        field: 'updatedAt'
    }
};

route.get('/availability/by-name/:name', auth(), async (req, res) => {
    try {
        const { exclude } = req?.query || {};
        const { name } = req?.params || {};

        const options = {
            where: {
                name
            }
        };
        if (exclude?.length) {
            options.where.id = {
                [Op.ne]: exclude
            };
        }
        const organization = await Organization.findOne(options);

        res.json({
            errorCode: null,
            data: {
                isAvailable: !organization
            }
        });
    } catch (e) {
        req.json({
            errorCode: null,
            data: {
                message: e.message,
                isAvailable: false
            }
        });
    }
});

generateCRUD(route, Delegation, 'delegation', 'delegations', delegationSchema, {
    createFunction: async (item, transaction) => {
        const { coordinates, delegationName, histories, reference, users } = item;
        const now = new Date();
        const { id: organizationId } = await Organization.create(
            {
                typeId: 5,
                name: delegationName,
                createdAt: now,
                isArchived: false,
                isDeleted: false
            },
            { transaction }
        );
        await Delegation.create(
            {
                organizationId,
                reference
            },
            { transaction }
        );

        await Promise.all(
            users?.map(async ({ user, comment, endDate, startDate, type, labelId }) => {
                let userId = user?.id;
                if (!userId) {
                    const { civilityId, firstName, lastName } = user;
                    const userCreation = await User.create(
                        {
                            civilityId,
                            lastName,
                            firstName,
                            isOldHeadMaster: false,
                            isDeleted: false,
                            isArchived: false,
                            createdAt: now
                        },
                        { transaction }
                    );
                    userId = userCreation?.id;
                }
                await Function.create(
                    {
                        labelId,
                        organizationId,
                        userId,
                        startDate,
                        endDate,
                        type,
                        comment,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            coordinates?.map(
                async ({
                    addressLine1,
                    addressLine3,
                    addressType,
                    cedex,
                    city,
                    email,
                    fax,
                    label,
                    mobileNumber,
                    phoneNumber,
                    recipient,
                    additionalRecipient,
                    voiceLabel,
                    voiceNumber,
                    website,
                    zipCode,
                    countryId
                }) => {
                    await Coordinate.create(
                        {
                            organizationId,
                            countryId,
                            label,
                            phoneNumber,
                            fax,
                            mobileNumber,
                            email,
                            website,
                            addressType,
                            recipient,
                            additionalRecipient,
                            addressLine1,
                            voiceNumber,
                            voiceLabel,
                            addressLine3,
                            zipCode,
                            city,
                            cedex,
                            isDefault: false,
                            createdAt: now
                        },
                        { transaction }
                    );
                }
            )
        );
        await Promise.all(
            histories?.map(async ({ comment, startDate, endDate, historyIdType, label, date }) => {
                await History.create(
                    {
                        historyIdType,
                        organizationId,
                        label,
                        date,
                        comment,
                        startDate,
                        endDate,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
    },
    updateFunction: async (id, item, transaction) => {
        const { coordinates, delegationName, histories, reference, users } = item;

        const now = new Date();
        const oldDelegations = await Delegation.findOne({
            where: { id },
            include: [
                {
                    model: Organization,
                    include: [
                        Coordinate,
                        {
                            model: History,
                            include: [User, HistoryType]
                        },
                        {
                            model: Function,
                            include: [User, FunctionLabel]
                        }
                    ]
                }
            ]
        });
        const { organizationId } = oldDelegations;
        await Organization.update(
            {
                typeId: 5,
                name: delegationName,
                updatedAt: now,
                isArchived: false,
                isDeleted: false
            },
            {
                where: { id: organizationId },
                transaction
            }
        );
        await Delegation.update(
            {
                organizationId,
                reference
            },
            { where: { id }, transaction }
        );
        //remove deleted  function
        const currentKey = users.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const functionsToDelete = oldDelegations.organization?.functions?.filter(
            (v) => !currentKey.has(v.id)
        );
        await Promise.all(
            functionsToDelete.map(async ({ id }) => {
                Function.destroy({
                    transaction,
                    where: { id }
                });
            })
        );
        //add function or update
        await Promise.all(
            users.map(async ({ id, comment, startDate, endDate, type, user, labelId }) => {
                const { civilityId, firstName, lastName } = user;
                let userId = user.id;
                //create user if not exist
                if (!userId) {
                    const { id: _userId } = await User.create(
                        {
                            civilityId,
                            lastName,
                            firstName,
                            isOldHeadMaster: false,
                            isDeleted: false,
                            isArchived: false,
                            createdAt: now
                        },
                        { transaction }
                    );
                    userId = _userId;
                }
                await Function.upsert(
                    {
                        id,
                        labelId,
                        organizationId,
                        userId,
                        startDate,
                        endDate,
                        type,
                        comment,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );

        //remove deleted Coordinates
        const currentCoordinate = coordinates.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const coordinatesToDelete = oldDelegations.organization?.coordinates?.filter(
            (v) => !currentCoordinate.has(v.id)
        );
        await Promise.all(
            coordinatesToDelete.map(async ({ id }) => {
                Coordinate.destroy(
                    {
                        where: { id }
                    },
                    { transaction }
                );
            })
        );
        //add or update coordinates
        await Promise.all(
            coordinates?.map(
                async ({
                    addressLine1,
                    addressLine3,
                    addressType,
                    cedex,
                    city,
                    email,
                    fax,
                    label,
                    mobileNumber,
                    phoneNumber,
                    recipient,
                    additionalRecipient,
                    voiceLabel,
                    voiceNumber,
                    website,
                    zipCode,
                    countryId,
                    id: coordinateId
                }) => {
                    await Coordinate.upsert(
                        {
                            id: coordinateId,
                            organizationId,
                            countryId,
                            label,
                            phoneNumber,
                            fax,
                            mobileNumber,
                            email,
                            website,
                            addressType,
                            recipient,
                            additionalRecipient,
                            addressLine1,
                            voiceNumber,
                            voiceLabel,
                            addressLine3,
                            zipCode,
                            city,
                            cedex,
                            isDefault: false,
                            createdAt: now
                        },
                        { transaction }
                    );
                }
            )
        );
        // delete removed histories
        const currrentHistories = histories.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const historiesToDelete = oldDelegations.organization?.histories?.filter(
            (v) => !currrentHistories.has(v.id)
        );
        await Promise.all(
            historiesToDelete.map(async ({ id }) => {
                History.destroy(
                    {
                        where: { id }
                    },
                    { transaction }
                );
            })
        );
        //add or update histrories
        await Promise.all(
            histories?.map(
                async ({
                    id: historyId,
                    comment,
                    startDate,
                    endDate,
                    historyIdType,
                    label,
                    date
                }) => {
                    await History.upsert(
                        {
                            id: historyId,
                            historyIdType,
                            organizationId,
                            label,
                            date,
                            comment,
                            startDate,
                            endDate,
                            createdAt: now
                        },
                        { transaction }
                    );
                }
            )
        );
    },

    queryCollection: {
        searchableFields: [],
        sortableFields: ['id', 'organization.name', 'organization.updatedAt', 'reference'],
        include: () => {
            return [
                {
                    model: Organization,
                    as: 'organization',
                    required: true
                }
            ];
        },
        baseQuery: async (_, filters, { search } = {}) => {
            if (search?.length) {
                const orgsIds = await sequelize.query(
                    `SELECT * FROM delegation join unitorg on delegation.id_unitorg = unitorg.id_unitorg WHERE MATCH(reference)
                        AGAINST('${search}' IN NATURAL LANGUAGE MODE) or MATCH(nom) AGAINST('${search}' IN NATURAL LANGUAGE MODE)
                `
                );

                const organizationIds = orgsIds
                    ?.filter((e) => e?.length)
                    .map((e) => e[0].id_unitorg);

                return search?.length
                    ? {
                          id_unitorg: {
                              [Op.in]: organizationIds
                          }
                      }
                    : undefined;
            }
            return {};
        },
        sortByTransformation: (sort) => {
            return sortMap[sort] || sort;
        }
    },
    guards: {
        list: auth({ action: 'list', subject: 'delegation' }),
        view: auth({ action: 'view', subject: 'delegation' }),
        create: auth({ action: 'create', subject: 'delegation' }),
        write: auth({ action: 'write', subject: 'delegation' }),
        delete: auth({ action: 'delete', subject: 'delegation' })
    },
    options: {
        viewInclude: [
            {
                model: Organization,
                include: [
                    Coordinate,
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
                        include: [{ model: User, include: Civility }, FunctionLabel]
                    },
                    {
                        model: Establishment,
                        as: 'establishment',
                        include: Department
                    }
                ]
            }
        ]
    }
});

export default route;
