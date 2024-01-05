import Sequelize from 'sequelize';

import sequelize from '../db';

const TypeOrganizationHasTypeOrganization = sequelize.define(
    'type_unitorg_has_type_unitorg',
    {
        parentTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'type_unitorg',
                key: 'id_type_unitorg'
            },
            field: 'id_type_unitorg_parent'
        },
        childTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'type_unitorg',
                key: 'id_type_unitorg'
            },
            field: 'id_type_unitorg_fils'
        }
    },
    {
        sequelize,
        tableName: 'type_unitorg_has_type_unitorg',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_type_unitorg_parent' }, { name: 'id_type_unitorg_fils' }]
            },
            {
                name: 'fk_type_unitorg_has_type_unitorg_type_unitorg1',
                using: 'BTREE',
                fields: [{ name: 'id_type_unitorg_fils' }]
            }
        ]
    }
);
export default TypeOrganizationHasTypeOrganization;
