import express from 'express';
import Sequelize from 'sequelize';

import sequelize from '../../db';
import auth from '../../middlewares/auth';
import models from '../../models/index';
import unetp from '../../schemas/unetp';

const {
    Organization,
    Coordinate,
    Function,
    FunctionLabel,
    Civility,
    User,
    History,
    HistoryType,
    UnetpCA
} = models;
const route = express.Router();

route.get('/', auth(), async (req, res) => {
    try {
        res.json(
            await UnetpCA.findOne({
                include: [
                    {
                        model: Organization,
                        include: [
                            Coordinate,
                            {
                                model: Function,
                                include: [{ model: User, include: Civility }, FunctionLabel]
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
                                include: [HistoryType, { model: User, include: Civility }]
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

route.get('/:id', auth(), async (req, res) => {
    const id = req.params.id;
    try {
        res.json(
            await UnetpCA.findOne({
                include: [
                    {
                        model: Organization,
                        where: { id },
                        include: [
                            Coordinate,
                            {
                                model: Function,
                                include: [{ model: User, include: Civility }, FunctionLabel]
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
                                include: [HistoryType, { model: User, include: Civility }]
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
route.post('/:id', auth(), async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const now = new Date();
        const id = req.params.id;
        const data = await unetp.validate(req.body);
        const { coordinates, functions, histories, name } = data;
        const oldCa = await UnetpCA.findOne({
            where: { id },
            include: [
                {
                    model: Organization,
                    include: [
                        Coordinate,
                        {
                            model: Function,
                            include: [{ model: User, include: Civility }, FunctionLabel]
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
                            include: [HistoryType, User]
                        }
                    ]
                }
            ]
        });
        await Organization.update(
            {
                name
            },
            { where: { id: oldCa?.organization?.id } },
            { transaction: t }
        );

        const currentCoordinate = coordinates.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const coordinatesToDelete = oldCa?.organization?.coordinates?.filter(
            (v) => !currentCoordinate.has(v.id)
        );
        await Promise.all(
            coordinatesToDelete.map(async ({ id }) => {
                Coordinate.destroy(
                    {
                        where: { id }
                    },
                    { transaction: t }
                );
            })
        );
        //coordiante to add or update
        await Promise.all(
            coordinates?.map(async ({ id: coordinateId, ...inf }) => {
                await Coordinate.upsert(
                    {
                        id: coordinateId,
                        organizationId: oldCa?.organization?.id,
                        ...inf,
                        isDefault: false,
                        createdAt: now
                    },
                    { transaction: t }
                );
            })
        );

        //function to delete
        const currentKey = functions.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const functionsToDelete = oldCa.organization?.functions?.filter(
            (v) => !currentKey.has(v.id)
        );
        await Promise.all(
            functionsToDelete.map(async ({ id }) => {
                Function.destroy(
                    {
                        where: { id }
                    },
                    { transaction: t }
                );
            })
        );
        //function to add or update
        await Promise.all(
            functions.map(async ({ comment, user, labelId, startDate, endDate, id }) => {
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
                        { transaction: t }
                    );
                    userId = _userId;
                }
                await Function.upsert(
                    {
                        id,
                        organizationId: oldCa?.organization?.id,
                        userId,
                        startDate,
                        endDate,
                        labelId,
                        comment,
                        createdAt: now
                    },
                    { transaction: t }
                );
            })
        );
        //history  to delete
        const currrentHistories = histories.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
        const historiesToDelete = oldCa.organization?.histories?.filter(
            (v) => !currrentHistories.has(v.id)
        );
        await Promise.all(
            historiesToDelete.map(async ({ id }) => {
                History.destroy(
                    {
                        where: { id }
                    },
                    { transaction: t }
                );
            })
        );
        //history to add or update
        await Promise.all(
            histories?.map(
                async ({ id, comment, historyIdType, label, startDate, endDate, date }) => {
                    await History.upsert(
                        {
                            id,
                            organizationId: oldCa?.organization?.id,
                            label,
                            startDate,
                            endDate,
                            date,
                            historyIdType,
                            createdAt: now,
                            comment
                        },
                        { transaction: t }
                    );
                }
            )
        );
        res.json({ status: 'ok' });
        await t.commit();
    } catch (e) {
        await t.rollback();
        res.status(500).end();
    }
});

export default route;
