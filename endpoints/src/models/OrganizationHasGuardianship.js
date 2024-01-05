import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationHasGuardianship = sequelize.define(
    'organizationHasGuardianship',
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
        guardianshipId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'tutelle',
                key: 'id_tutelle'
            },
            field: 'id_tutelle'
        }
    },
    {
        sequelize,
        tableName: 'unitorg_has_tutelle',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }, { name: 'id_tutelle' }]
            },
            {
                name: 'fk_unitorg_has_tutelle_tutelle',
                using: 'BTREE',
                fields: [{ name: 'id_tutelle' }]
            }
        ]
    }
);
export default OrganizationHasGuardianship;
