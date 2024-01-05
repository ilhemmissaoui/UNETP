import Sequelize from 'sequelize';

import sequelize from '../db';

const Sequence = sequelize.define(
    'sequence',
    {
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        next_val: {
            type: Sequelize.BIGINT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'sequence',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'name' }]
            }
        ]
    }
);
export default Sequence;
