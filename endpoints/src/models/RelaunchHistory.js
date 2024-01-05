import Sequelize from 'sequelize';

import sequelize from '../db';

const RelaunchHistory = sequelize.define(
    'RelaunchHistory',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_historique_relance'
        },
        establishmentId: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'id_etablissement'
        },
        subject: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'sujet'
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'contenu'
        },
        sendDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_envoie'
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'statut'
        }
    },
    {
        sequelize,
        tableName: 'historque_relance',
        timestamps: false,
        indexes: [
            {
                name: 'id_etablissement',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_etablissement' }]
            }
        ]
    }
);
export default RelaunchHistory;
