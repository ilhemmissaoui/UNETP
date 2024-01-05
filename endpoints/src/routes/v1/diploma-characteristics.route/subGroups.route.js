import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaSubGroupSchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaSubGroup } = models;
const route = express.Router();

generateCRUD(
    route,
    DiplomaSubGroup,
    'diploma-subGroup',
    'diploma-subGroups',
    diplomaSubGroupSchema,
    {
        queryCollection: {
            searchableFields: ['label', 'code'],
            sortableFields: ['id', 'label', 'code']
        },
        guards: {
            list: auth({ action: 'list', subject: 'diploma.sub-group' }),
            view: auth({ action: 'view', subject: 'diploma.sub-group' }),
            create: auth({ action: 'create', subject: 'diploma.sub-group' }),
            write: auth({ action: 'write', subject: 'diploma.sub-group' }),
            delete: auth({ action: 'delete', subject: 'diploma.sub-group' })
        }
    }
);

export default route;
