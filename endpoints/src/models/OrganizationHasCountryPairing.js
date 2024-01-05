import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationHasCountryPairing = sequelize.define(
    'organizationHasCountryPairing',
    {
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_etablisement_jumelage'
        },
        countryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'pays',
                key: 'id_pays'
            },
            field: 'id_pays_jumelage'
        }
    },
    {
        sequelize,
        tableName: 'unitorg_has_pays_jumelage',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablisement_jumelage' }, { name: 'id_pays_jumelage' }]
            },
            {
                name: 'fk_unitorg_has_pays_pays_jumelage',
                using: 'BTREE',
                fields: [{ name: 'id_pays_jumelage' }]
            }
        ]
    }
);
export default OrganizationHasCountryPairing;
