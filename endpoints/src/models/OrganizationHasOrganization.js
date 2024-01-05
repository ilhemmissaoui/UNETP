import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationHasOrganization = sequelize.define(
    'organizationChild',
    {
        parentOrganizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg_parent'
        },
        childOrganizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg_fils'
        }
    },
    {
        sequelize,
        tableName: 'unitorg_has_unitorg',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_unitorg_parent' }, { name: 'id_unitorg_fils' }]
            },
            {
                name: 'fk_unitorg_has_unitorg_unitorg1',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg_fils' }]
            }
        ]
    }
);
export default OrganizationHasOrganization;
