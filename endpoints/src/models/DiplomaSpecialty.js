import Sequelize from 'sequelize';

import sequelize from '../db';

const DiplomaSpecialty = sequelize.define(
    'diplomaSpecialty',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_diplome_specialite'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        },
        code: {
            type: Sequelize.STRING(255),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'diplome_specialite',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_diplome_specialite' }]
            },
            {
                name: 'code',
                using: 'BTREE',
                fields: [{ name: 'code' }]
            }
        ]
    }
);
export default DiplomaSpecialty;
