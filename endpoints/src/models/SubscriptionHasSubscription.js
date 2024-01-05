import Sequelize from 'sequelize';

import sequelize from '../db';

const SubscriptionHasSubscription = sequelize.define(
    'subscriptionHasSubscription',
    {
        establishmentSubscriptionFeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'cotisation',
                key: 'id_cotisation'
            },
            field: 'id_cotisation_etablissement'
        },
        userSubscriptionFeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'cotisation',
                key: 'id_cotisation'
            },
            field: 'id_cotisation_personne'
        }
    },
    {
        sequelize,
        tableName: 'cotisation_has_cotisation',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [
                    { name: 'id_cotisation_etablissement' },
                    { name: 'id_cotisation_personne' }
                ]
            },
            {
                name: 'fk_cotisation_has_cotisation_cotisation_personne',
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_personne' }]
            }
        ]
    }
);
export default SubscriptionHasSubscription;
