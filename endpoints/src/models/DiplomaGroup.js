import Sequelize from 'sequelize';

import sequelize from '../db';

const DiplomaGroup = sequelize.define(
    'diplomaGroup',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_diplome_groupe'
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
        tableName: 'diplome_groupe',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_diplome_groupe' }]
            },
            {
                name: 'code',
                using: 'BTREE',
                fields: [{ name: 'code' }]
            }
        ]
    }
);
export default DiplomaGroup;
