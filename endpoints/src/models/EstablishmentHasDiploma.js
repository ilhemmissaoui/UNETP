import Sequelize from 'sequelize';

import sequelize from '../db';

const EstablishmentHasDiploma = sequelize.define(
    'diplomas',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_etablissement_has_diplome'
        },
        establishmentId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_etablissement'
        },
        diplomaId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome',
                key: 'id_diplome'
            },
            field: 'id_diplome'
        },
        complement: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'etablissement_has_diplome',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablissement_has_diplome' }]
            },
            {
                name: 'fk_etablissement_has_diplome_diplome',
                using: 'BTREE',
                fields: [{ name: 'id_diplome' }]
            },
            {
                name: 'fk_etablissement_has_diplome_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }]
            }
        ]
    }
);
export default EstablishmentHasDiploma;
