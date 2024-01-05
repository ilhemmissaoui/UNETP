import Sequelize from 'sequelize';

import sequelize from '../db';
const EstablishmentYearlySubscriptions = sequelize.define(
    'vue_appli_cotis_etab',
    {
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_unitorg'
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'nom'
        },
        archived: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'archived'
        },
        establishmentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_etablissement'
        },
        establishmentNumber: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'numero_etablissement'
        },
        establishmentKey: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'cle_etablissement'
        },
        year: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'annee'
        },
        subscriptionFeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_cotisation'
        },
        status: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'statut'
        },
        capacityHistoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_historique_capacite'
        },
        lpContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_sc_lp'
        },
        lgtContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_sc_lt'
        },
        btsContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_sc_bts'
        },
        collegeContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_sc_college'
        },
        supContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_sc_sup'
        },
        totalUnderContract: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'total_sc'
        },
        withoutContractLpStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_hc_lp'
        },
        withoutContractLgtStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_hc_lt'
        },
        withoutContractBtsStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_hc_bts'
        },
        withoutContractSupStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_hc_sup'
        },
        totalWithoutContract: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'total_hc'
        },
        apprenticesCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_apprentis'
        },
        hoursCount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'nb_heures'
        },
        studentEmployerCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_college_employeur'
        },
        fixedPart: {
            type: Sequelize.DECIMAL(42, 2),
            allowNull: true,
            field: 'montant_part_fixe'
        }
    },
    {
        sequelize,
        tableName: 'vue_appli_cotis_etab',
        timestamps: false
    }
);
EstablishmentYearlySubscriptions.sync = () => Promise.resolve();
EstablishmentYearlySubscriptions.sortableFields = ['subscriptionFeeId', 'year'];

export default EstablishmentYearlySubscriptions;
