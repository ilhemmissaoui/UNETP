import Sequelize from 'sequelize';

import sequelize from '../db';

const Coordinate = sequelize.define(
    'coordinate',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_coordonnee'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'personne',
                key: 'id_personne'
            },
            field: 'id_personne'
        },
        functionId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'fonction',
                key: 'id_fonction'
            },
            field: 'id_fonction'
        },
        countryId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'pays',
                key: 'id_pays'
            },
            field: 'id_pays'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Exemple : \n- personnelle\n- professionnelle',
            field: 'libelle'
        },
        phoneNumber: {
            type: Sequelize.STRING(45),
            allowNull: true,
            field: 'telephone'
        },
        fax: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        mobileNumber: {
            type: Sequelize.STRING(45),
            allowNull: true,
            field: 'mobile'
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        website: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'site_web'
        },
        addressType: {
            type: Sequelize.ENUM('particulier', 'professionnel'),
            allowNull: true,
            field: 'type_adresse_postale'
        },
        recipient: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: "Permet de reprendre les nom-prénom ou le nom de l'entreprise.",
            field: 'destinataire'
        },
        additionalRecipient: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'destinataire_complement'
        },
        addressLine1: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'adresse_ligne1'
        },
        voiceNumber: {
            type: Sequelize.STRING(45),
            allowNull: true,
            field: 'numero_voie'
        },
        voiceLabel: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle_voie'
        },
        addressLine3: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'adresse_ligne3'
        },
        zipCode: {
            type: Sequelize.STRING(45),
            allowNull: true,
            field: 'code_postal'
        },
        city: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'ville'
        },
        cedex: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        isDefault: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'defaut'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_creation'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_modification'
        },
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'createur'
        },
        updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'modificateur'
        }
    },
    {
        sequelize,
        tableName: 'coordonnee',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_coordonnee' }]
            },
            {
                name: 'fk_coordonnee_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            },
            {
                name: 'fk_coordonnee_personne',
                using: 'BTREE',
                fields: [{ name: 'id_personne' }]
            },
            {
                name: 'fk_coordonnee_fonction',
                using: 'BTREE',
                fields: [{ name: 'id_fonction' }]
            },
            {
                name: 'fk_coordonnee_pays',
                using: 'BTREE',
                fields: [{ name: 'id_pays' }]
            },
            {
                name: 'email',
                using: 'BTREE',
                fields: [{ name: 'email' }]
            },
            {
                name: 'code_postal',
                using: 'BTREE',
                fields: [{ name: 'code_postal' }]
            },
            {
                name: 'defaut',
                using: 'BTREE',
                fields: [{ name: 'defaut' }]
            }
        ]
    }
);
export default Coordinate;
