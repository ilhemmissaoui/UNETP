import Sequelize from 'sequelize';

import sequelize from '../db';

const IOHistory = sequelize.define(
    'ioHistory',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_historique_readh_dem'
        },
        establishmentId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'etablissement',
                key: 'id_etablissement'
            },
            field: 'id_etablissement'
        },
        type: {
            type: Sequelize.ENUM('readhesion', 'demission'),
            allowNull: true,
            field: 'type_historique'
        },
        date: {
            type: Sequelize.DATE(),
            allowNull: true,
            field: 'date'
        }
    },
    {
        sequelize,
        tableName: 'historique_readh_dem',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_historique_readh_dem' }]
            },
            {
                name: 'id_etablissement',
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }]
            }
        ]
    }
);
export default IOHistory;
