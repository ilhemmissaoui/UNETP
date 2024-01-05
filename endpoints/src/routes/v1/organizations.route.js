import express from 'express';

import sequelize from '../../db';
import auth from '../../middlewares/auth';
import models from '../../models/index';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';

const { Organization } = models;
const route = express.Router();

route.get('/:typeId', auth(), async (req, res) => {
    const typeId = req.params.typeId;
    try {
        res.json(
            await queryCollection({
                collection: Organization,
                sortableFields: Organization.sortableFields,
                searchableFields: ['name'],
                filterOptions: Organization.filterOptions,
                internalFields: Organization.internalFields,
                params: extractParamsFromRequest(req),
                baseQuery: {
                    typeId
                }
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

route.post('/remove-archive', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const orgs = await Organization.findAll({
            where: {
                isArchived: true
            }
        });
        await Promise.all(
            orgs.map(async ({ id }) => {
                await Organization.destroy({
                    where: { id },
                    truncate: true
                });
            })
        );

        await transaction.commit();
        return res.status(200).json({ ok: true });
    } catch (e) {
        console.log(e);
        await transaction.rollback();

        if (e?.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(500).json({ message: 'SequelizeForeignKeyConstraintError' });
        } else {
            return res.status(500).json();
        }
    }
});

route.get('/', auth(), async (req, res) => {
    try {
        res.json(
            await queryCollection({
                collection: Organization,
                sortableFields: Organization.sortableFields,
                searchableFields: ['name'],
                filterOptions: Organization.filterOptions,
                internalFields: Organization.internalFields,
                params: extractParamsFromRequest(req)
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

export default route;
