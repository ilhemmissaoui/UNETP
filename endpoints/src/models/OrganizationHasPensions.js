import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationHasPensions = sequelize.define(
    'organizationHasPensions',
    {
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_etablissement'
        },
        pensionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'pension',
                key: 'id_pension'
            },
            field: 'id_pension'
        }
    },
    {
        sequelize,
        tableName: 'unitorg_has_pension',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }, { name: 'id_pension' }]
            },
            {
                name: 'fk_unitorg_has_pension_pension',
                using: 'BTREE',
                fields: [{ name: 'id_pension' }]
            }
        ]
    }
);
export default OrganizationHasPensions;
