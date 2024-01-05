import Sequelize from 'sequelize';

import sequelize from '../db';

const College = sequelize.define(
    'college',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_college'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        }
    },
    {
        sequelize,
        tableName: 'college',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_college' }]
            }
        ]
    }
);
export default College;
