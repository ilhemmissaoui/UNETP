import express from 'express';

import auth from '../../middlewares/auth';
import functionSchema from '../../schemas/function';
import generateCRUD from '../../utils/generateCRUD';

const route = express.Router();

generateCRUD(route, Function, 'function', 'functions', functionSchema, {
    queryCollection: {
        searchableFields: ['label'],
        sortableFields: ['id', 'label']
    },
    guards: {
        list: auth({ action: 'list', subject: 'diploma.function' }),
        view: auth({ action: 'view', subject: 'diploma.function' }),
        create: auth({ action: 'create', subject: 'diploma.function' }),
        write: auth({ action: 'write', subject: 'diploma.function' }),
        delete: auth({ action: 'delete', subject: 'diploma.function' })
    }
});

export default route;
