import Sequelize from 'sequelize';

import sequelize from '../db';

const Department = sequelize.define(
    'department',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_departement'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        },
        departmentCode: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'code_departement'
        }
    },
    {
        sequelize,
        tableName: 'departement',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_departement' }]
            },
            {
                name: 'code_departement',
                using: 'BTREE',
                fields: [{ name: 'code_departement' }]
            }
        ]
    }
);
export default Department;
