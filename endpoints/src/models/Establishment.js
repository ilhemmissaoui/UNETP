import Sequelize from 'sequelize';

import sequelize from '../db';
import yup from '../lib/yup';

const Establishment = sequelize.define(
    'establishment',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_etablissement'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        },
        delegationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_delegation'
        },
        parentEstablishementId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_etablissement_pere'
        },
        academyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'academie',
                key: 'id_academie'
            },
            field: 'id_academie'
        },
        departmentId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'departement',
                key: 'id_departement'
            },
            field: 'id_departement'
        },
        delegateId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'personne',
                key: 'id_personne'
            },
            field: 'id_delegue'
        },
        establishmentKey: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'cle_etablissement'
        },
        establishmentNumber: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'numero_etablissement'
        },
        relationship: {
            type: Sequelize.ENUM('membre adhérent', 'membre associé', 'non membre'),
            allowNull: true,
            field: 'relation_unetp'
        },
        numAcadLP: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'num_acad_lp'
        },
        numAcadLT: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'num_acad_lt'
        },
        numAcadCFA: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'num_acad_cfa'
        },
        numExistanceCFP: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'num_existence_cfp'
        },
        mixed: {
            type: Sequelize.ENUM('mixte', 'fille', 'garçon', 'nc'),
            allowNull: true,
            field: 'mixite'
        },
        comments: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaires'
        },
        trainingComment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaires_formation'
        },
        privateComment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaires_prives'
        },
        accessDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_premiere_adhesion'
        },
        ogecName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'name'
        },
        ogecAddress: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'zip_code'
        },
        ogecPhoneNumber: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'phone_number'
        },
        ogecCity: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'city'
        },
        ogecEmail: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'email'
        }
    },
    {
        sequelize,
        tableName: 'etablissement',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }]
            },
            {
                name: 'fk_etablissement_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            },
            {
                name: 'fk_etablissement_academie',
                using: 'BTREE',
                fields: [{ name: 'id_academie' }]
            },
            {
                name: 'fk_etablissement_unitorg1',
                using: 'BTREE',
                fields: [{ name: 'id_delegation' }]
            },
            {
                name: 'fk_etablissement_unitorg2',
                using: 'BTREE',
                fields: [{ name: 'id_etablissement_pere' }]
            },
            {
                name: 'fk_etablissement_departement',
                using: 'BTREE',
                fields: [{ name: 'id_departement' }]
            },
            {
                name: 'fk_etablissement_personne',
                using: 'BTREE',
                fields: [{ name: 'id_delegue' }]
            },
            {
                name: 'cle_etablissement',
                using: 'BTREE',
                fields: [{ name: 'cle_etablissement' }]
            },
            {
                name: 'numero_etablissement',
                using: 'BTREE',
                fields: [{ name: 'numero_etablissement' }]
            },
            {
                name: 'relation_unetp',
                using: 'BTREE',
                fields: [{ name: 'relation_unetp' }]
            }
        ]
    }
);
Establishment.filterOptions = {
    establishmentNumber: yup.string(),
    establishmentKey: yup.string()
};
export default Establishment;
