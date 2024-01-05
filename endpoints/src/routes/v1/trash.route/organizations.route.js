import express from 'express';
import { Op } from 'sequelize';

import sequelize from '../../../db';
import models from '../../../models/index';
import { userSchema } from '../../../schemas/advancedSearch';
import generateCRUD from '../../../utils/generateCRUD';

const { Organization } = models;
const route = express.Router();

route.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
        await Organization.destroy(
            {
                where: { id },
                truncate: true
            },
            { transaction }
        );

        await transaction.commit();
        return res.status(200).json({ ok: true });
    } catch (e) {
        await transaction.rollback();
        if (e?.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(500).json({ message: 'SequelizeForeignKeyConstraintError' });
        } else {
            return res.status(500).json();
        }
    }
});

generateCRUD(route, Organization, 'organization', 'organizations', userSchema, {
    queryCollection: {
        sortableFields: ['id', 'name'],
        internalFields: Organization.internalFields,
        where: {
            isArchived: true
        },
        filterOptions: Organization.filterOptions,
        baseQuery: async (_, filters, { search } = {}) => {
            return search?.length
                ? {
                      isArchived: true,
                      name: { [Op.like]: `%${search}%` }
                  }
                : {
                      isArchived: true
                  };
        }
    }
});

export default route;
