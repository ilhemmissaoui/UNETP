import Sequelize from 'sequelize';

import sequelize from '../db';

const SubscriptionFeePaymentRef = sequelize.define(
    'subscriptionFeesPaymentRef',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_cotisation_ref_paiement'
        },
        paimentType: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'type_paiement'
        },
        depositDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_depot'
        },
        cashedDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_encaissement'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        },
        reference: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        bankStatus: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'banque_statut'
        },
        bankRef: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'banque_reference'
        },
        bankLogs: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'banque_logs'
        }
    },
    {
        sequelize,
        tableName: 'cotisation_ref_paiement',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_ref_paiement' }]
            }
        ]
    }
);
export default SubscriptionFeePaymentRef;
