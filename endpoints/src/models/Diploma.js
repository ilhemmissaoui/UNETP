import Sequelize from 'sequelize';

import sequelize from '../db';
import yup from '../lib/yup';

const Diploma = sequelize.define(
    'diploma',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_diplome'
        },
        diplomaTypeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_type',
                key: 'id_diplome_type'
            },
            field: 'id_diplome_type'
        },
        diplomaGroupId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_groupe',
                key: 'id_diplome_groupe'
            },
            field: 'id_diplome_groupe'
        },
        diplomaSubGroupId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_sous_groupe',
                key: 'id_diplome_sous_groupe'
            },
            field: 'id_diplome_sous_groupe'
        },
        diplomaDomainId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_domaine',
                key: 'id_diplome_domaine'
            },
            field: 'id_diplome_domaine'
        },
        diplomaGradeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_niveau',
                key: 'id_diplome_niveau'
            },
            field: 'id_diplome_niveau'
        },
        diplomaSpecialtyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_specialite',
                key: 'id_diplome_specialite'
            },
            field: 'id_diplome_specialite'
        },
        diplomaFunctionId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'diplome_fonction',
                key: 'id_diplome_fonction'
            },
            field: 'id_diplome_fonction'
        },
        reference: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom'
        }
    },
    {
        sequelize,
        tableName: 'diplome',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_diplome' }]
            },
            {
                name: 'fk_diplome_diplome_groupe',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_groupe' }]
            },
            {
                name: 'fk_diplome_diplome_specialite',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_specialite' }]
            },
            {
                name: 'fk_diplome_diplome_niveau',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_niveau' }]
            },
            {
                name: 'fk_diplome_diplome_domaine',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_domaine' }]
            },
            {
                name: 'fk_diplome_diplome_type',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_type' }]
            },
            {
                name: 'fk_diplome_diplome_sous_groupe',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_sous_groupe' }]
            },
            {
                name: 'fk_diplome_diplome_fonction',
                using: 'BTREE',
                fields: [{ name: 'id_diplome_fonction' }]
            },
            {
                name: 'reference',
                using: 'BTREE',
                fields: [{ name: 'reference' }]
            }
        ]
    }
);
Diploma.filterOptions = {
    reference: yup.string()
};
export default Diploma;
