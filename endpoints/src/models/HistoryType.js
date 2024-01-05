import Sequelize from 'sequelize';

import sequelize from '../db';

const HistoryType = sequelize.define(
    'historyType',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_type_historique'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'type_historique',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_type_historique' }]
            }
        ]
    }
);
export default HistoryType;
