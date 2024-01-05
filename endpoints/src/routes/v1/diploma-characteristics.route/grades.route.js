import express from 'express';

import auth from '../../../middlewares/auth';
import models from '../../../models/index';
import { diplomaGradeSchema } from '../../../schemas/diploma';
import generateCRUD from '../../../utils/generateCRUD';

const { DiplomaGrade } = models;
const route = express.Router();

generateCRUD(route, DiplomaGrade, 'diploma-grade', 'diploma-grades', diplomaGradeSchema, {
    queryCollection: {
        searchableFields: ['label', 'code'],
        sortableFields: ['id', 'label', 'code']
    },
    guards: {
        list: auth({ action: 'list', subject: 'diploma.grade' }),
        view: auth({ action: 'view', subject: 'diploma.grade' }),
        create: auth({ action: 'create', subject: 'diploma.grade' }),
        write: auth({ action: 'write', subject: 'diploma.grade' }),
        delete: auth({ action: 'delete', subject: 'diploma.grade' })
    }
});

export default route;
