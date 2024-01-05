import Sequelize from 'sequelize';

import sequelize from '../db';

const Pension = sequelize.define(
    'pension',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_pension'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        }
    },
    {
        sequelize,
        tableName: 'pension',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_pension' }]
            }
        ]
    }
);
export default Pension;
