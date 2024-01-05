import express from 'express';

import auth from '../../middlewares/auth';
import Coordinate from '../../models/Coordinate';
import Department from '../../models/Department';
import models from '../../models/index';
import guardianshipSchema from '../../schemas/guardianship';
import generateCRUD from '../../utils/generateCRUD';

const { Guardianship, Organization, Establishment } = models;
const route = express.Router();

generateCRUD(route, Guardianship, 'guardianship', 'guardianships', guardianshipSchema, {
    queryCollection: {
        searchableFields: ['label'],
        sortableFields: ['id', 'label']
    },
    guards: {
        list: auth({ action: 'list', subject: 'guardianship' }),
        view: auth({ action: 'view', subject: 'guardianship' }),
        create: auth({ action: 'create', subject: 'guardianship' }),
        write: auth({ action: 'write', subject: 'guardianship' }),
        delete: auth({ action: 'delete', subject: 'guardianship' })
    },
    options: {
        viewInclude: [
            {
                model: Organization,
                include: [
                    {
                        model: Establishment,
                        as: 'establishment',
                        include: [
                            { model: Department },
                            { model: Organization, as: 'organization', include: Coordinate }
                        ]
                    }
                ]
            }
        ]
    }
});

export default route;
