import express from 'express';
import { Op } from 'sequelize';

import Function from '../../../models/Function';
import FunctionLabel from '../../../models/FunctionLabel';
import User from '../../../models/User';
import queryCollection, { extractParamsFromRequest } from '../../../utils/queryCollection';

const route = express.Router();

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
                    required: true,
                    include: {
                        model: FunctionLabel,
                        required: true,
                        where: {
                            singularMaleName: {
                                [Op.like]: '%comptable%'
                            }
                        }
                    }
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
