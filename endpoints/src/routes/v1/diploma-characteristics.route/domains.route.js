import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaDomainSchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaDomain } = models;
const route = express.Router();

generateCRUD(route, DiplomaDomain, 'diploma-domain', 'diploma-domains', diplomaDomainSchema, {
    queryCollection: {
        searchableFields: ['label', 'code'],
        sortableFields: ['id', 'label', 'code']
    },
    guards: {
        list: auth({ action: 'list', subject: 'diploma.domain' }),
        view: auth({ action: 'view', subject: 'diploma.domain' }),
        create: auth({ action: 'create', subject: 'diploma.domain' }),
        write: auth({ action: 'write', subject: 'diploma.domain' }),
        delete: auth({ action: 'delete', subject: 'diploma.domain' })
    }
});

export default route;
