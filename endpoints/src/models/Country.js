import Sequelize from 'sequelize';

import sequelize from '../db';

const Country = sequelize.define(
    'country',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_pays'
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
        tableName: 'pays',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_pays' }]
            }
        ]
    }
);
export default Country;
