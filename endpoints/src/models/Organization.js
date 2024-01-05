import Sequelize from 'sequelize';

import sequelize from '../db';
import yup from '../lib/yup';

const Organization = sequelize.define(
    'organization',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_unitorg'
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'type_unitorg',
                key: 'id_type_unitorg'
            },
            field: 'id_type_unitorg'
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom'
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_creation'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'date de dernière modification',
            field: 'date_modification'
        },
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: "prenom-nom ou login de la personne ayant créé l'élément",
            field: 'createur'
        },
        updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'prenom-nom ou login de la personne ayant réalisé la dernière modification.',
            field: 'modificateur'
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            comment: 'Si on souhaite ne pas supprimer physiquement les éléments.',
            field: 'deleted'
        },
        isArchived: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'archived'
        },
        logoFilename: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'file_name_logo'
        }
    },
    {
        sequelize,
        tableName: 'unitorg',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            },
            {
                name: 'fk_unitorg_type_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_type_unitorg' }]
            },
            {
                name: 'nom',
                using: 'BTREE',
                fields: [{ name: 'nom' }]
            },
            {
                name: 'deleted',
                using: 'BTREE',
                fields: [{ name: 'deleted' }]
            }
        ]
    }
);
Organization.filterOptions = {
    name: yup.string().transform((v) => {
        return decodeURIComponent(v);
    })
};

export default Organization;
