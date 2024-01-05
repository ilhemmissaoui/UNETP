import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models/index';
import academySchema from '../../schemas/academy';
import generateCRUD from '../../utils/generateCRUD';

const { Academy } = models;
const route = express.Router();

generateCRUD(route, Academy, 'academy', 'academies', academySchema, {
    queryCollection: {
        searchableFields: ['name'],
        sortableFields: ['id', 'name']
    },
    guards: {
        list: auth({ action: 'list', subject: 'academy' }),
        view: auth({ action: 'view', subject: 'academy' }),
        create: auth({ action: 'create', subject: 'academy' }),
        write: auth({ action: 'write', subject: 'academy' }),
        delete: auth({ action: 'delete', subject: 'academy' })
    }
});

export default route;
