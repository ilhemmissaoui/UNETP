import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models/index';
import pensionSchema from '../../schemas/pension';
import generateCRUD from '../../utils/generateCRUD';

const { Pension } = models;
const route = express.Router();

generateCRUD(route, Pension, 'pension', 'pensions', pensionSchema, {
    queryCollection: {
        searchableFields: ['label'],
        sortableFields: ['id', 'label']
    },
    guards: {
        list: auth({ action: 'list', subject: 'pension' }),
        view: auth({ action: 'view', subject: 'pension' }),
        create: auth({ action: 'create', subject: 'pension' }),
        write: auth({ action: 'write', subject: 'pension' }),
        delete: auth({ action: 'delete', subject: 'pension' })
    }
});

export default route;
