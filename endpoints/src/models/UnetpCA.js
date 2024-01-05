import Sequelize from 'sequelize';

import sequelize from '../db';

const UnetpCA = sequelize.define(
    'unetpCA',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_ca_unetp'
        },
        college: {
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
        tableName: 'ca_unetp',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_ca_unetp' }]
            },
            {
                name: 'fk_ca_unetp_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);
export default UnetpCA;
