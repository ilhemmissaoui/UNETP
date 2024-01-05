import Sequelize from 'sequelize';

import sequelize from '../db';

const A = sequelize.define(
    'cotisation_courrier',
    {
        id_cotisation_courrier: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        msg_appel_cotisation: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        msg_relance: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        msg_gel_compte: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        sujet_appel_cotisation: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        sujet_relance: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        sujet_gel_compte: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        expediteur_appel_cotisation: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        expediteur_relance: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        expediteur_gel_compte: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        frequence_relance: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        seuil_gel: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'cotisation_courrier',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_courrier' }]
            }
        ]
    }
);
export default A;
