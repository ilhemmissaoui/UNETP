import express from 'express';
import { Op } from 'sequelize';
import Sequelize from 'sequelize';

import sequelize from '../../db';
import auth from '../../middlewares/auth';
import Civility from '../../models/Civility';
import Establishment from '../../models/Establishment';
import models from '../../models/index';
import networkSchema from '../../schemas/networks';
import generateCRUD from '../../utils/generateCRUD';

const {
    Network,
    Organization,
    Coordinate,
    History,
    User,
    Function,
    FunctionLabel,
    HistoryType,
    NetworkHasOrganization,
    Country
} = models;

const route = express.Router();

const sortMap = {
    'organization.name': {
        models: [Network.associations.organization],
        field: 'name'
    },
    'organization.updatedAt': {
        models: [Network.associations.organization],
        field: 'updatedAt'
    },
    'organization.createdAt': {
        models: [Network.associations.organization],
        field: 'createdAt'
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
        console.log(e);
        req.json({
            errorCode: null,
            data: {
                message: e.message,
                isAvailable: false
            }
        });
    }
});

generateCRUD(route, Network, 'network', 'networks', networkSchema, {
    createFunction: async (item, transaction) => {
        const now = new Date();
        const {
            organization: { histories, functions, coordinates, ...organization },
            establishments,
            createdAt = new Date()
        } = item;
        const { id: organizationId } = await Organization.create(
            {
                typeId: 6,
                name: organization?.name,
                createdAt: now,
                isArchived: false,
                isDeleted: false,
                description: organization?.description
            },
            { transaction }
        );
        const { id: networkId } = await Network.create(
            {
                organizationId,
                createdAt
            },
            { transaction }
        );
        await Promise.all(
            coordinates.map((e) =>
                Coordinate.create({ ...e, organizationId, isDefault: false }, { transaction })
            )
        );

        await Promise.all(
            establishments.map(
                async ({ id, establishmentKey, establishmentNumber, organization }) => {
                    let connectedOrganizationId = id;
                    //create establishement
                    if (!connectedOrganizationId) {
                        const _childOrganizationId = await Organization.create(
                            {
                                name: organization?.name,
                                typeId: 4,
                                isDeleted: false,
                                isArchived: false,
                                createdAt: now
                            },
                            { transaction }
                        );
                        await Establishment.create(
                            {
                                establishmentKey,
                                establishmentNumber,
                                organizationId: _childOrganizationId?.id
                            },
                            { transaction }
                        );
                        connectedOrganizationId = _childOrganizationId?.id;
                    }
                    await NetworkHasOrganization.upsert(
                        {
                            establishmentId: connectedOrganizationId,
                            networkId
                        },
                        { transaction }
                    );
                }
            )
        );

        await Promise.all(
            functions.map(async ({ user, ...fn }) => {
                let userId;
                if (typeof user?.id !== 'undefined') userId = user?.id;
                else {
                    const { id: _userId } = await User.create(
                        {
                            ...user,
                            isDeleted: false,
                            isArchived: false,
                            isOldHeadMaster: false
                        },
                        { transaction }
                    );
                    userId = _userId;
                }
                await Function.create({ ...fn, userId, organizationId }, { transaction });
            })
        );
        await Promise.all(
            histories.map((e) => History.create({ ...e, organizationId }, { transaction }))
        );
    },
    updateFunction: async (id, item, transaction, req) => {
        const now = new Date();
        const {
            organization: { histories, functions, coordinates, ...organization },
            establishments
        } = item;
        const oldDNetwork = await Network.findOne({
            where: { id },
            include: [
                {
                    model: NetworkHasOrganization,
                    include: {
                        model: Organization,
                        include: { model: Establishment, as: 'establishment' }
                    }
                },
                {
                    model: Organization,
                    as: 'organization',
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

        const { organizationId } = oldDNetwork;
        await Organization.update(
            {
                typeId: 6,
                ...organization,
                updatedAt: now,
                isArchived: false,
                isDeleted: false,
                createdBy: req?.user?.id
            },
            {
                where: { id: organizationId },
                transaction
            }
        );
        //coordinates to remove
        const currentCoordinate = coordinates.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const coordinatesToDelete = oldDNetwork?.organization?.coordinates?.filter(
            (v) => !currentCoordinate.has(v.id)
        );
        await Promise.all(
            coordinatesToDelete.map(async ({ id }) => {
                Coordinate.destroy({
                    where: { id },
                    transaction
                });
            })
        );
        //coordiante to add or update
        await Promise.all(
            coordinates?.map(async ({ id: coordinateId, ...inf }) => {
                await Coordinate.upsert(
                    {
                        id: coordinateId,
                        organizationId,
                        ...inf,
                        isDefault: false,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
        //establishment to delete
        const currentEstablishment = establishments.reduce(
            (a, c) => a.add(parseInt(c?.id)),
            new Set()
        );
        const establishmentsToDelete = oldDNetwork?.organizations?.filter(
            (v) => !currentEstablishment.has(v?.establishmentId)
        );
        await Promise.all(
            establishmentsToDelete.map(async ({ establishmentId }) => {
                NetworkHasOrganization.destroy({
                    where: {
                        [Op.and]: { networkId: oldDNetwork?.id },
                        [Op.and]: { establishmentId }
                    },
                    transaction
                });
            })
        );
        //establishment to add or update
        await Promise.all(
            establishments.map(
                async ({ id, establishmentKey, establishmentNumber, organization }) => {
                    let connectedOrganizationId = id;
                    //create establishement
                    if (!connectedOrganizationId) {
                        const _childOrganizationId = await Organization.create(
                            {
                                name: organization?.name,
                                typeId: 4,
                                isDeleted: false,
                                isArchived: false,
                                createdAt: now
                            },
                            { transaction }
                        );
                        await Establishment.create(
                            {
                                establishmentKey,
                                establishmentNumber,
                                organizationId: _childOrganizationId?.id
                            },
                            { transaction }
                        );
                        connectedOrganizationId = _childOrganizationId?.id;
                    }
                    await NetworkHasOrganization.upsert(
                        {
                            establishmentId: connectedOrganizationId,
                            networkId: oldDNetwork.id
                        },
                        { transaction }
                    );
                }
            )
        );
        //function to delete
        const currentKey = functions.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const functionsToDelete = oldDNetwork.organization?.functions?.filter(
            (v) => !currentKey.has(v?.id)
        );
        await Promise.all(
            functionsToDelete.map(async ({ id }) => {
                Function.destroy({
                    where: { id },
                    transaction
                });
            })
        );
        //function to add or update
        await Promise.all(
            functions.map(async ({ user, ...rest }) => {
                let userId = user?.id;
                //create user if not exist
                if (!userId) {
                    const { id: _userId } = await User.create(
                        {
                            ...user,
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
                        ...rest,
                        organizationId,
                        userId,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
        //history  to delete
        const currrentHistories = histories.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const historiesToDelete = oldDNetwork.organization?.histories?.filter(
            (v) => !currrentHistories.has(v.id)
        );
        await Promise.all(
            historiesToDelete.map(async ({ id }) => {
                History.destroy({
                    where: { id }
                });
            })
        );
        //history to add or update
        await Promise.all(
            histories?.map(async (history) => {
                await History.upsert(
                    {
                        ...history,
                        organizationId,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
    },
    queryCollection: {
        sortableFields: [
            'id',
            'organization.name',
            'organization.createdAt',
            'organization.updatedAt'
        ],
        include: (_, filters, { search }) => {
            return [
                {
                    model: Organization,
                    as: 'organization',
                    required: true,
                    where: search?.length
                        ? {
                              name: { [Op.like]: `%${search}%` }
                          }
                        : undefined
                }
            ];
        },
        sortByTransformation: (sort) => {
            return sortMap[sort] || sort;
        }
    },
    guards: {
        list: auth({ action: 'list', subject: 'network' }),
        view: auth({ action: 'view', subject: 'network' }),
        create: auth({ action: 'create', subject: 'network' }),
        write: auth({ action: 'write', subject: 'network' }),
        delete: auth({ action: 'delete', subject: 'network' })
    },
    options: {
        viewInclude: [
            {
                model: Organization,
                as: 'organization',
                include: [
                    { model: Coordinate, include: Country },
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
                    }
                ]
            },
            {
                model: NetworkHasOrganization,
                include: {
                    model: Organization,
                    include: { model: Establishment, as: 'establishment' }
                }
            }
        ]
    }
});

export default route;
