import express from 'express';

import auth from '../../middlewares/auth';
import Department from '../../models/Department';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';

const route = express.Router();

route.get('/', auth(), async (req, res) => {
    try {
        res.json(
            await queryCollection({
                collection: Department,
                sortableFields: Department.sortableFields,
                searchableFields: Department.searchableFields,
                filterOptions: Department.filterOptions,
                internalFields: Department.internalFields,
                params: extractParamsFromRequest(req)
            })
        );
    } catch (e) {
        res.status(500).end();
    }
});

export default route;
