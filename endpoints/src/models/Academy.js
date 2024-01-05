import Sequelize from 'sequelize';

import sequelize from '../db';

const Academy = sequelize.define(
    'academy',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_academie'
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom'
        }
    },
    {
        sequelize,
        tableName: 'academie',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_academie' }]
            }
        ]
    }
);
export default Academy;
