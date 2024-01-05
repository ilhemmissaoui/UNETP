import Sequelize from 'sequelize';

import sequelize from '../db';

const UnionSubscriptionFees = sequelize.define(
    'unionSubscriptionFees',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_cotisation_syndicat'
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
        tableName: 'cotisation_syndicat',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_syndicat' }]
            }
        ]
    }
);
export default UnionSubscriptionFees;
