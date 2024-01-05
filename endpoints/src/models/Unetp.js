import Sequelize from 'sequelize';

import sequelize from '../db';

const Unetp = sequelize.define(
    'unetp',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_unetp'
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
        tableName: 'unetp',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_unetp' }]
            },
            {
                name: 'fk_unetp_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);
export default Unetp;
