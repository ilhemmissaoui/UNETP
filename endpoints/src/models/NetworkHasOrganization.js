import Sequelize from 'sequelize';

import sequelize from '../db';

const NetworkHasOrganization = sequelize.define(
    'organization',
    {
        networkId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'reseau',
                key: 'id_reseau'
            },
            field: 'id_reseau'
        },
        establishmentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_etablissement'
        }
    },
    {
        sequelize,
        tableName: 'reseau_has_unitorg',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_reseau' }, { name: 'id_etablissement' }]
            },
            {
                name: 'fk_reseau_has_unitorg_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }]
            }
        ]
    }
);
export default NetworkHasOrganization;
