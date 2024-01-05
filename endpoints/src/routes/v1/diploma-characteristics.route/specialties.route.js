import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaSpecialtySchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaSpecialty } = models;
const route = express.Router();

generateCRUD(
    route,
    DiplomaSpecialty,
    'diploma-specialty',
    'diploma-specialties',
    diplomaSpecialtySchema,
    {
        queryCollection: {
            searchableFields: ['label', 'code'],
            sortableFields: ['id', 'label', 'code']
        },
        guards: {
            list: auth({ action: 'list', subject: 'diploma.specialty' }),
            view: auth({ action: 'view', subject: 'diploma.specialty' }),
            create: auth({ action: 'create', subject: 'diploma.specialty' }),
            write: auth({ action: 'write', subject: 'diploma.specialty' }),
            delete: auth({ action: 'delete', subject: 'diploma.specialty' })
        }
    }
);

export default route;
