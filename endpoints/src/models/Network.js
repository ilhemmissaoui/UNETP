import Sequelize from 'sequelize';

import sequelize from '../db';

const Network = sequelize.define(
    'network',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_reseau'
        },
        createdAt: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_creation_reseau'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        }
    },
    {
        sequelize,
        tableName: 'reseau',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_reseau' }]
            },
            {
                name: 'fk_reseau_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);
export default Network;
