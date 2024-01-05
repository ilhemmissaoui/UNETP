import Sequelize from 'sequelize';

import sequelize from '../db';

const SubscriptionFee = sequelize.define(
    'subscriptionFee',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_cotisation'
        },
        subscriptionFeeParamsId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'cotisation_parametre',
                key: 'id_cotisation_parametre'
            },
            field: 'id_cotisation_parametre'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'personne',
                key: 'id_personne'
            },
            field: 'id_personne'
        },
        unionDuesId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'cotisation_syndicat',
                key: 'id_cotisation_syndicat'
            },
            field: 'id_cotisation_syndicat'
        },
        calculatedAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'montant_calcule'
        },
        customAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'montant_personnalise'
        },
        fixedPartAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'montant_part_fixe'
        },
        status: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'statut'
        },
        reminderCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'nb_relance'
        },
        remindedAt: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_last_relance'
        }
    },
    {
        sequelize,
        tableName: 'cotisation',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_cotisation' }]
            },
            {
                name: 'fk_cotisation_cotisation_syndicat',
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_syndicat' }]
            },
            {
                name: 'fk_cotisation_personne',
                using: 'BTREE',
                fields: [{ name: 'id_personne' }]
            },
            {
                name: 'fk_cotisation_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            },
            {
                name: 'fk_cotisation_cotisation_parametre',
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_parametre' }]
            },
            {
                name: 'statut',
                using: 'BTREE',
                fields: [{ name: 'statut' }]
            }
        ]
    }
);
export default SubscriptionFee;
