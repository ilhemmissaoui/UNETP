import express from 'express';

import sequelize from '../../db';
import models from '../../models/index';

const { Coordinate } = models;
const route = express.Router();

route.post('/user-coordinate/:coordinateId', async (req, res) => {
    const now = new Date();
    const { coordinateId } = req?.params || {};
    const { item } = req?.body || {};

    const t = await sequelize.transaction();

    try {
        await Coordinate.upsert(
            {
                id: coordinateId,
                isDefault: false,
                createdAt: now,
                ...item.data
            },
            { transaction: t }
        );

        res.json({ status: 'ok' });
        await t.commit();
    } catch (e) {
        console.log(e);
        await t.rollback();
        res.status(500).end();
    }
});

export default route;
