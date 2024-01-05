import Sequelize from 'sequelize';

import sequelize from '../db';

const DiplomaDomain = sequelize.define(
    'diplomaDomain',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_diplome_domaine'
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
        tableName: 'diplome_domaine',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_diplome_domaine' }]
            },
            {
                name: 'code',
                using: 'BTREE',
                fields: [{ name: 'code' }]
            }
        ]
    }
);
export default DiplomaDomain;
