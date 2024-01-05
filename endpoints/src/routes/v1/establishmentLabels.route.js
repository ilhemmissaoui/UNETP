import express from 'express';

import auth from '../../middlewares/auth';
import Coordinate from '../../models/Coordinate';
import Department from '../../models/Department';
import Establishment from '../../models/Establishment';
import models from '../../models/index';
import labelSchema from '../../schemas/label';
import generateCRUD from '../../utils/generateCRUD';

const { EstablishmentLabel, Organization, OrganizationHasEstablishmentLabel } = models;
const route = express.Router();

generateCRUD(
    route,
    EstablishmentLabel,
    'establishment-label',
    'establishment-labels',
    labelSchema,
    {
        queryCollection: {
            searchableFields: ['label'],
            sortableFields: ['id', 'label']
        },
        guards: {
            list: auth({ action: 'list', subject: 'establishment-label' }),
            view: auth({ action: 'view', subject: 'establishment-label' }),
            create: auth({ action: 'create', subject: 'establishment-label' }),
            write: auth({ action: 'write', subject: 'establishment-label' }),
            delete: auth({ action: 'delete', subject: 'establishment-label' })
        },
        options: {
            viewInclude: [
                {
                    model: OrganizationHasEstablishmentLabel,
                    include: [
                        {
                            model: Organization,

                            include: [
                                {
                                    model: Establishment,
                                    as: 'establishment',
                                    include: [
                                        { model: Department },
                                        {
                                            model: Organization,
                                            as: 'organization',
                                            include: Coordinate
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
);

export default route;
