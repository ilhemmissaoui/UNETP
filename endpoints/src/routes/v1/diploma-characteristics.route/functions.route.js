import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaFunctionSchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaFunction } = models;
const route = express.Router();

generateCRUD(
    route,
    DiplomaFunction,
    'diploma-function',
    'diploma-functions',
    diplomaFunctionSchema,
    {
        queryCollection: {
            searchableFields: ['label', 'code'],
            sortableFields: ['id', 'label', 'code']
        },
        guards: {
            list: auth({ action: 'list', subject: 'diploma.function' }),
            view: auth({ action: 'view', subject: 'diploma.function' }),
            create: auth({ action: 'create', subject: 'diploma.function' }),
            write: auth({ action: 'write', subject: 'diploma.function' }),
            delete: auth({ action: 'delete', subject: 'diploma.function' })
        }
    }
);

export default route;
