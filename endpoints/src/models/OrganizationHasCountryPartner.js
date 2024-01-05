import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationHasCountryPartner = sequelize.define(
    'organizationHasCountryPartner',
    {
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_etablissement_partenaire'
        },
        countryPartnerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'pays',
                key: 'id_pays'
            },
            field: 'id_pays_partenaire'
        }
    },
    {
        sequelize,
        tableName: 'unitorg_has_pays_partenaire',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablissement_partenaire' }, { name: 'id_pays_partenaire' }]
            },
            {
                name: 'fk_unitorg_has_pays_pays_partenaire',
                using: 'BTREE',
                fields: [{ name: 'id_pays_partenaire' }]
            }
        ]
    }
);
export default OrganizationHasCountryPartner;
