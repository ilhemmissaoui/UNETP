import Sequelize from 'sequelize';

import sequelize from '../db';

const Meta = sequelize.define(
    'meta',
    {
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            primaryKey: true,
            field: 'nom'
        },
        value: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'valeur'
        }
    },
    {
        sequelize,
        tableName: 'meta',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'nom' }]
            }
        ]
    }
);
export default Meta;
