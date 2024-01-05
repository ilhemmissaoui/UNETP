import Sequelize from 'sequelize';

import sequelize from '../db';

const SubscriptionPayment = sequelize.define(
    'subscriptionPayment',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_cotisation_paiement'
        },
        subscriptionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'cotisation',
                key: 'id_cotisation'
            },
            field: 'id_cotisation'
        },
        paymentRefId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'cotisation_ref_paiement',
                key: 'id_cotisation_ref_paiement'
            },
            field: 'id_cotisation_ref_paiement'
        },
        amount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'montant'
        }
    },
    {
        sequelize,
        tableName: 'cotisation_paiement',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_paiement' }]
            },
            {
                name: 'fk_cotisation_paiement_cotisation_ref_paiement',
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_ref_paiement' }]
            },
            {
                name: 'fk_cotisation_paiement_cotisation',
                using: 'BTREE',
                fields: [{ name: 'id_cotisation' }]
            }
        ]
    }
);
export default SubscriptionPayment;
