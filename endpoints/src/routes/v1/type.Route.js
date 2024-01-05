import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models/index';
import typeSchema from '../../schemas/type';
import generateCRUD from '../../utils/generateCRUD';

const { Type } = models;
const route = express.Router();

generateCRUD(route, Type, 'type', 'types', typeSchema, {
    queryCollection: {
        searchableFields: ['label'],
        sortableFields: ['id', 'label']
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
