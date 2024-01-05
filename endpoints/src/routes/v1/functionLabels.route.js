import express from 'express';

import yup from '../../lib/yup';
import auth from '../../middlewares/auth';
import models from '../../models';
import functionLabelSchema from '../../schemas/functionLabel';
import generateCRUD from '../../utils/generateCRUD';
const { FunctionLabel, OrganizationType } = models;

const route = express.Router();
const sortMap = {
    'organizationType.label': { models: [OrganizationType], field: 'label' }
};
generateCRUD(route, FunctionLabel, 'function-label', 'functions-labels', functionLabelSchema, {
    queryCollection: {
        filterOptions: {
            organizationTypeId: yup.string()
        },
        include: [
            {
                model: OrganizationType
            }
        ],
        searchableFields: [
            'singularMaleName',
            'singularFemaleName',
            'pluralMaleName',
            'pluralFemaleName'
        ],
        sortableFields: [
            'id',
            'singularMaleName',
            'singularFemaleName',
            'pluralMaleName',
            'pluralFemaleName',
            'organizationType.label',
            'isHeadMaster'
        ],
        sortByTransformation: (sort) => {
            return sortMap[sort] || sort;
        }
    },
    guards: {
        list: auth({ action: 'list', subject: 'function-label' }),
        view: auth({ action: 'view', subject: 'function-label' }),
        create: auth({ action: 'create', subject: 'function-label' }),
        write: auth({ action: 'write', subject: 'function-label' }),
        delete: auth({ action: 'delete', subject: 'function-label' })
    },
    options: {
        viewInclude: [OrganizationType]
    }
});

export default route;
