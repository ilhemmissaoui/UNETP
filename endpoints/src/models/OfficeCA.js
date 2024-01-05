import Sequelize from 'sequelize';

import sequelize from '../db';

const OfficeCA = sequelize.define(
    'officeCA',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_bureau_ca'
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
        tableName: 'bureau_ca',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_bureau_ca' }]
            },
            {
                name: 'fk_bureau_ca_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);
export default OfficeCA;
