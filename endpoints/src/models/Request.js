import Sequelize from 'sequelize';

import sequelize from '../db';

const Request = sequelize.define(
    'request',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_demande'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'user_id'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_creation'
        },
        json: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'json'
        },
        objectType: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'unitorg metier / personne',
            field: 'type_objet'
        },
        objectName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom_objet'
        },
        objectId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "null => creation d'un objet (de type_objet)",
            field: 'id_objet'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        }
    },
    {
        sequelize,
        tableName: 'demande',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_demande' }]
            },

            {
                name: 'FK_Demande_Person',
                using: 'BTREE',
                fields: [{ name: 'user_id' }]
            }
        ]
    }
);
export default Request;
