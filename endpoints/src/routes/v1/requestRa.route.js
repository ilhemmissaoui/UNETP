import express from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../../db';
import models from '../../models/index';
import requestSchema from '../../schemas/request';
import generateCRUD from '../../utils/generateCRUD';

const { AdvancedSearchRequest } = models;
const route = express.Router();
route.get('/execute/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { request, label } = await AdvancedSearchRequest.findOne({
            where: {
                id
            }
        });
        const data = await sequelize.query(request, {
            type: QueryTypes.SELECT
        });
        res.json({ data, label });
    } catch (e) {
        res.status(500).end();
    }
});

generateCRUD(route, AdvancedSearchRequest, 'request', 'requests', requestSchema, {
    createFunction: async (item, transaction) => {
        const { label, request, tree, fieldSelected } = item;
        await AdvancedSearchRequest.create(
            {
                label,
                fields: JSON.stringify(fieldSelected),
                request,
                tree,
                mode: 1
            },
            { transaction }
        );
    },
    updateFunction: async (id, item, transaction) => {
        const { label, fieldSelected, request, tree } = item;
        await AdvancedSearchRequest.update(
            {
                label,
                fields: JSON.stringify(fieldSelected),
                request,
                tree,
                mode: 1
            },
            {
                where: { id: id, mode: 1 },
                transaction
            }
        );
    },
    queryCollection: {
        searchableFields: ['id'],
        sortableFields: AdvancedSearchRequest.sortableFields,
        internalFields: AdvancedSearchRequest.internalFields,
        filterOptions: AdvancedSearchRequest.filterOptions,
        baseQuery: {
            mode: 1
        }
    }
});

export default route;
