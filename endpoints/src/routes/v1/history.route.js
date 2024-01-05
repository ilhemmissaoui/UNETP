import express from 'express';
import Sequelize from 'sequelize';

import models from '../../models/index';

const { History } = models;
const route = express.Router();

route.post('/finalDate', async (req, res) => {
    try {
        res.json(
            await History.findAll({
                attributes: {
                    include: [
                        [Sequelize.literal(`COALESCE(date,date_debut,date_fin)`), 'finalDate']
                    ]
                },
                order: [[Sequelize.literal('finalDate'), 'DESC']],
                raw: true
            })
        );
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

export default route;
