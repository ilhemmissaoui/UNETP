import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';

const { OrganizationType } = models;
const route = express.Router();

route.get('/', auth(), async (req, res) => {
    try {
        res.json(
            await queryCollection({
                collection: OrganizationType,
                params: extractParamsFromRequest(req)
            })
        );
    } catch (e) {
        res.status(500).end();
        console.log(e);
    }
});

export default route;
