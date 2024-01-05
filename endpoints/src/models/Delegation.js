import Sequelize from 'sequelize';

import sequelize from '../db';

const Delegation = sequelize.define(
    'delegation',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_delegation'
        },
        reference: {
            type: Sequelize.STRING(255),
            allowNull: true
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
        tableName: 'delegation',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_delegation' }]
            },
            {
                name: 'fk_delegation_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);
export default Delegation;
