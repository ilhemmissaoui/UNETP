import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models/index';
import civilitySchema from '../../schemas/civility';
import generateCRUD from '../../utils/generateCRUD';

const { Civility } = models;
const route = express.Router();

generateCRUD(route, Civility, 'civility', 'civilities', civilitySchema, {
    queryCollection: {
        searchableFields: ['name', 'abbreviation', 'gender', 'rank'],
        sortableFields: ['id', 'name', 'abbreviation', 'gender', 'rank']
    },
    guards: {
        list: auth({ action: 'list', subject: 'civility' }),
        view: auth({ action: 'view', subject: 'civility' }),
        create: auth({ action: 'create', subject: 'civility' }),
        write: auth({ action: 'write', subject: 'civility' }),
        delete: auth({ action: 'delete', subject: 'civility' })
    }
});

export default route;
