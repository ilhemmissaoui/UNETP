import express from 'express';

import Country from '../../models/Country';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';
const route = express.Router();
import auth from '../../middlewares/auth';

route.get('/', auth(), async (req, res) => {
    try {
        res.json(
            await queryCollection({
                collection: Country,
                sortableFields: Country.sortableFields,
                searchableFields: Country.searchableFields,
                filterOptions: Country.filterOptions,
                internalFields: Country.internalFields,
                params: extractParamsFromRequest(req)
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

export default route;
