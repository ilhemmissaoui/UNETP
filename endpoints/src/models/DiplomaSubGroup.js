import Sequelize from 'sequelize';

import sequelize from '../db';

const DiplomaSubGroup = sequelize.define(
    'diplomaSubGroup',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_diplome_sous_groupe'
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
        tableName: 'diplome_sous_groupe',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_diplome_sous_groupe' }]
            },
            {
                name: 'code',
                using: 'BTREE',
                fields: [{ name: 'code' }]
            }
        ]
    }
);
export default DiplomaSubGroup;
