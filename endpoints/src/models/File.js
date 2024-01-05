import Sequelize from 'sequelize';

import sequelize from '../db';

const File = sequelize.define(
    'file',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_fichier'
        },
        newslettersMailingId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'nl_envoi',
                key: 'id_nl_envoi'
            },
            field: 'id_nl_envoi'
        },
        fileName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'filename'
        },
        clientFileName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'client_filename'
        },
        contentType: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'content_type'
        },
        mode: {
            type: Sequelize.BLOB,
            allowNull: true
        },
        extension: {
            type: Sequelize.STRING(32),
            allowNull: true
        },
        capacity: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'poids'
        },
        width: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'largeur'
        },
        height: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'hauteur'
        },
        depositDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_depot'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        },
        usageType: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'type_usage'
        },
        fileDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_fichier'
        }
    },
    {
        sequelize,
        tableName: 'fichier',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_fichier' }]
            },
            {
                name: 'fk_fichier_nl_envoi1',
                using: 'BTREE',
                fields: [{ name: 'id_nl_envoi' }]
            }
        ]
    }
);
export default File;
