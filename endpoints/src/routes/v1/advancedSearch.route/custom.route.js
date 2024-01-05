import express from 'express';

import Function from '../../../models/Function';
import FunctionLabel from '../../../models/FunctionLabel';
import User from '../../../models/User';
import requestSchema from '../../../schemas/request';
import generateCRUD from '../../../utils/generateCRUD';
import queryCollection, { extractParamsFromRequest } from '../../../utils/queryCollection';
import models from '../../models/index';

const { ra_requete } = models;
const route = express.Router();
generateCRUD(route, ra_requete, 'request', 'requests', requestSchema, {
    createFunction: async (item, transaction) => {
        const { label, result, request } = item;

        await ra_requete.create(
            {
                label,
                class: result,
                request,
                mode: 1
            },
            { transaction }
        );
    },
    updateFunction: async (id, item, transaction) => {
        const { label, result, request, mode } = item;
        await ra_requete.update(
            {
                label,
                class: result,
                request,
                mode
            },
            {
                where: { id: id, mode: 1 },
                transaction
            }
        );
    }
});
route.get('/accountants', async (req, res) => {
    res.json(
        await queryCollection({
            collection: User,
            sortableFields: User.sortableFields,
            searchableFields: User.searchableFields,
            filterOptions: User.filterOptions,
            internalFields: User.internalFields,
            params: extractParamsFromRequest(req),
            baseQuery: {},
            include: [
                {
                    model: Function,
                    include: FunctionLabel
                }
            ]
        })
    );
});

export default route;

// select distinct p
// from Personne as p
// inner join p.fonctions as f
// inner join f.labelFonction as lf
// where lf.chefEtablissement = '1'
// and lf.nomMasculin like 'comptable'
// and p.deleted != '1'
// and p.archived != '1'
