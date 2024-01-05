import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationHasEstablishmentLabel = sequelize.define(
    'organizationHasEstablishmentLabel',
    {
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        },
        labelId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'label_etablissement',
                key: 'id_label_etablissement'
            },
            field: 'id_label_etablissement'
        }
    },
    {
        sequelize,
        tableName: 'unitorg_has_label_etablissement',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }, { name: 'id_label_etablissement' }]
            },
            {
                name: 'fk_unitorg_has_label_etablissement_label_etablissement',
                using: 'BTREE',
                fields: [{ name: 'id_label_etablissement' }]
            }
        ]
    }
);
export default OrganizationHasEstablishmentLabel;
