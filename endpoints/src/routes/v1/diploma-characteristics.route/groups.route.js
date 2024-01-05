import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaGroupSchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaGroup } = models;
const route = express.Router();

generateCRUD(route, DiplomaGroup, 'diploma-group', 'diploma-groups', diplomaGroupSchema, {
    queryCollection: {
        searchableFields: ['label', 'code'],
        sortableFields: ['id', 'label', 'code']
    },
    guards: {
        list: auth({ action: 'list', subject: 'diploma.group' }),
        view: auth({ action: 'view', subject: 'diploma.group' }),
        create: auth({ action: 'create', subject: 'diploma.group' }),
        write: auth({ action: 'write', subject: 'diploma.group' }),
        delete: auth({ action: 'delete', subject: 'diploma.group' })
    }
});

export default route;
