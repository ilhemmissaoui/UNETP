import Sequelize from 'sequelize';

import sequelize from '../db';

const InterRegion = sequelize.define(
    'interregion',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_interregion'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        }
    },
    {
        sequelize,
        tableName: 'interregion',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_interregion' }]
            }
        ]
    }
);
export default InterRegion;
