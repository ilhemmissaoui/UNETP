import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaTypeSchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaType } = models;
const route = express.Router();

route.post('/list', async (req, res) => {
    try {
        res.json({ ok: true });
    } catch (e) {
        res.status(500).end();
    }
});

generateCRUD(route, DiplomaType, 'diploma-type', 'diploma-type', diplomaTypeSchema, {
    queryCollection: {
        searchableFields: ['label', 'code'],
        sortableFields: ['id', 'label', 'code']
    },
    guards: {
        list: auth({ action: 'list', subject: 'diploma.type' }),
        view: auth({ action: 'view', subject: 'diploma.type' }),
        create: auth({ action: 'create', subject: 'diploma.type' }),
        write: auth({ action: 'write', subject: 'diploma.type' }),
        delete: auth({ action: 'delete', subject: 'diploma.type' })
    }
});

export default route;
