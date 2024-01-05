import express from 'express';

import auth from '../../middlewares/auth';
import models from '../../models/index';
import subscriptionFees from '../../schemas/subscriptionFees';
import generateCRUD from '../../utils/generateCRUD';

const { UnionSubscriptionFees } = models;
const route = express.Router();

generateCRUD(
    route,
    UnionSubscriptionFees,
    'UnionSubscriptionFee',
    'UnionSubscriptionFees',
    subscriptionFees,
    {
        queryCollection: {
            searchableFields: ['label'],
            sortableFields: ['id', 'label']
        },
        guards: {
            list: auth({ action: 'list', subject: 'subscription-param' }),
            view: auth({ action: 'view', subject: 'subscription-param' }),
            create: auth({ action: 'create', subject: 'subscription-param' }),
            write: auth({ action: 'write', subject: 'subscription-param' }),
            delete: auth({ action: 'delete', subject: 'subscription-param' })
        }
    }
);

export default route;
