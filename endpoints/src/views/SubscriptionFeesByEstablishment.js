import Sequelize from 'sequelize';

import sequelize from '../db';

const SubscriptionFeesByEstablishment = sequelize.define('vue_appli_cotis_etab', {
    organizationId: {
        field: 'id_unitorg',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: 0
    },
    establishmentName: {
        field: 'nom',
        type: Sequelize.STRING(255),
        allowNull: true
    },
    isArchived: {
        field: 'archived',
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    establishmentNumber: {
        field: 'numero_etablissement',
        type: Sequelize.STRING(255),
        allowNull: true
    },
    establishmentKey: {
        field: 'cle_etablissement',
        type: Sequelize.STRING(255),
        allowNull: true
    },
    year: {
        field: 'annee',
        type: Sequelize.STRING(255),
        allowNull: true
    },
    subscriptionId: {
        field: 'id_cotisation',
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        field: 'statut',
        type: Sequelize.STRING(255),
        allowNull: true
    },
    id_historique_capacite: {
        field: 'id_historique_capacite',
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    nb_sc_lp: {
        field: 'nb_sc_lp',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_sc_lt: {
        field: 'nb_sc_lt',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_sc_bts: {
        field: 'nb_sc_bts',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_sc_sup: {
        field: 'nb_sc_sup',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    total_sc: {
        field: 'total_sc',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_hc_lp: {
        field: 'nb_hc_lp',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_hc_lt: {
        field: 'nb_hc_lt',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_hc_bts: {
        field: 'nb_hc_bts',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_hc_sup: {
        field: 'nb_hc_sup',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    total_hc: {
        field: 'total_hc',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_apprentis: {
        field: 'nb_apprentis',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    nb_heures: {
        field: 'nb_heures',
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    nb_college_employeur: {
        field: 'nb_college_employeur',
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    montant_part_fixe: {
        field: 'montant_part_fixe',
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 0.0
    }
});

export default SubscriptionFeesByEstablishment;
