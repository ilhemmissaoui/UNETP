import Sequelize from 'sequelize';

import sequelize from '../db';
import yup from '../lib/yup';

const User = sequelize.define(
    'user',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_personne'
        },
        civilityId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'civilite',
                key: 'id_civilite'
            },
            field: 'id_civilite'
        },
        accessId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'acces',
                key: 'id_acces'
            },
            field: 'id_acces'
        },
        middleSchoolId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'college',
                key: 'id_college'
            },
            field: 'id_college'
        },
        iterRegionId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'interregion',
                key: 'id_interregion'
            },
            field: 'id_interregion'
        },
        particle: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'particule'
        },
        firstName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom'
        },
        lastName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'prenom'
        },
        birthName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom_naissance'
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_naissance'
        },
        gender: {
            type: Sequelize.ENUM('M', 'F', 'NC'),
            allowNull: true,
            field: 'sexe'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        },
        relationship: {
            type: Sequelize.ENUM(
                'membre adhérent',
                'membre associé',
                'membre correspondant',
                'extérieur',
                'autre'
            ),
            allowNull: true,
            field: 'relation_unetp'
        },
        delegateNumber: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'cas ou la personne à la fonction délegué dans un établissement',
            field: 'num_delegue'
        },
        isOldHeadMaster: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'ancien_chef_etab'
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
        avatar: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'file_name_photo'
        }
    },
    {
        sequelize,
        tableName: 'personne',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_personne' }]
            },
            {
                name: 'fk_personne_college',
                using: 'BTREE',
                fields: [{ name: 'id_college' }]
            },
            {
                name: 'fk_personne_interregion',
                using: 'BTREE',
                fields: [{ name: 'id_interregion' }]
            },
            {
                name: 'fk_personne_civilite',
                using: 'BTREE',
                fields: [{ name: 'id_civilite' }]
            },
            {
                name: 'fk_personne_acces',
                using: 'BTREE',
                fields: [{ name: 'id_acces' }]
            },
            {
                name: 'nom',
                using: 'BTREE',
                fields: [{ name: 'nom' }]
            },
            {
                name: 'prenom',
                using: 'BTREE',
                fields: [{ name: 'prenom' }]
            },
            {
                name: 'relation_unetp',
                using: 'BTREE',
                fields: [{ name: 'relation_unetp' }]
            },
            {
                name: 'ancien_chef_etab',
                using: 'BTREE',
                fields: [{ name: 'ancien_chef_etab' }]
            },
            {
                name: 'deleted',
                using: 'BTREE',
                fields: [{ name: 'deleted' }]
            }
        ]
    }
);

const relationshipMap = {
    'membre adhérent': 'Membre adhérent',
    'membre associé': 'Membre associé',
    'membre correspondant': 'Membre correspondant',
    extérieur: 'Extérieur',
    nc: null
};
User.filterOptions = {
    // department: yup.string(),
    organizationType: yup.number(),
    functionLabel: yup.number(),
    relationship: yup
        .string()
        .transform((v) => relationshipMap[v])
        .nullable(),
    isArchived: yup.boolean().transform((v) => {
        return v;
    })
};
export default User;
