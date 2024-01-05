import Sequelize from 'sequelize';

import sequelize from '../db';
const SubscriptionFeesYearlyReceipts = sequelize.define(
    'vue_appli_paiement_annuel',
    {
        year: {
            type: Sequelize.STRING(255),
            allowNull: false,
            primaryKey: true,
            field: 'annee'
        },
        paimentCES: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'paiements_ces'
        },
        paimentEtabs: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'paiements_etabs'
        },
        fixedPart: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'montant_part_fixe'
        },
        total: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'total'
        }
    },
    {
        sequelize,
        tableName: 'vue_appli_paiement_annuel',
        timestamps: false
    }
);
SubscriptionFeesYearlyReceipts.sync = () => Promise.resolve();
SubscriptionFeesYearlyReceipts.sortableFields = ['year'];

export default SubscriptionFeesYearlyReceipts;
