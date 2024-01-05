import express from 'express';
import { Op } from 'sequelize';

import sequelize from '../../../db';
import auth from '../../../middlewares/auth';
import Access from '../../../models/Access';
import Civility from '../../../models/Civility';
import Coordinate from '../../../models/Coordinate';
import Department from '../../../models/Department';
import Establishment from '../../../models/Establishment';
import Function from '../../../models/Function';
import FunctionLabel from '../../../models/FunctionLabel';
import History from '../../../models/History';
import HistoryType from '../../../models/HistoryType';
import Organization from '../../../models/Organization';
import SubscriptionFee from '../../../models/SubscriptionFee';
import SubscriptionParams from '../../../models/SubscriptionParams';
import UnionSubscriptionFees from '../../../models/UnionSubscriptionFees';
import User from '../../../models/User';
import userSchema from '../../../schemas/user';
import generateCRUD from '../../../utils/generateCRUD';

const router = express.Router();

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
        await User.destroy(
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

generateCRUD(router, User, 'user', 'users', userSchema, {
    queryCollection: {
        searchableFields: [],
        sortableFields: ['id'],
        internalFields: User.internalFields,
        where: {
            isArchived: true
        },
        filterOptions: User.filterOptions,
        include: () => {
            return [
                Coordinate,
                Civility,
                {
                    model: History,
                    include: HistoryType
                },

                {
                    model: Function,

                    include: [
                        {
                            model: FunctionLabel,
                            required: false
                        },
                        {
                            model: Organization,
                            required: false,
                            include: {
                                model: Establishment,
                                as: 'establishment',
                                include: Department
                            }
                        }
                    ]
                }
            ];
        },
        baseQuery: async (_, filters, { search } = {}) => {
            return search?.length
                ? {
                      isArchived: true,
                      [Op.or]: [
                          { firstName: { [Op.like]: `%${search}%` } },
                          { lastName: { [Op.like]: `%${search}%` } }
                      ]
                  }
                : {
                      isArchived: true
                  };
        },
        filterTransformation: (filters) => {
            return filters;
        }
    },
    guards: {
        list: auth({ action: 'list', subject: 'user' }),
        view: auth({ action: 'view', subject: 'user' }),
        create: auth({ action: 'create', subject: 'user' }),
        write: auth({ action: 'write', subject: 'user' }),
        delete: auth({ action: 'delete', subject: 'user' })
    },
    withBaseRoute: true,
    options: {
        softDeleteField: 'isDeleted',
        viewInclude: [
            Coordinate,
            Civility,

            {
                model: SubscriptionFee,
                required: false,
                separate: true,
                include: [{ model: SubscriptionParams }, { model: UnionSubscriptionFees }]
            },

            {
                model: History,
                include: [User, HistoryType]
            },

            {
                model: Function,
                include: [
                    { model: User, include: [Civility] },
                    FunctionLabel,
                    {
                        model: Organization,
                        required: false,
                        include: [
                            {
                                model: Establishment,
                                as: 'establishment',
                                include: Department
                            },
                            Coordinate
                        ]
                    }
                ]
            },
            Access
        ]
    }
});

export default router;
