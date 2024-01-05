import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models/index';
import historyTypeSchema from '../../schemas/historyType';
import generateCRUD from '../../utils/generateCRUD';

const { HistoryType } = models;
const route = express.Router();

generateCRUD(route, HistoryType, 'history-type', 'history-types', historyTypeSchema, {
    queryCollection: {
        searchableFields: ['label'],
        sortableFields: ['id', 'label', 'description']
    },
    guards: {
        list: auth({ action: 'list', subject: 'history-type' }),
        view: auth({ action: 'view', subject: 'history-type' }),
        create: auth({ action: 'create', subject: 'history-type' }),
        write: auth({ action: 'write', subject: 'history-type' }),
        delete: auth({ action: 'delete', subject: 'history-type' })
    }
});

export default route;
