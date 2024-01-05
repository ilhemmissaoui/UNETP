import Sequelize from 'sequelize';

import sequelize from '../db';
const SubscriptionFeesYearlyPrevisioned = sequelize.define(
    'vue_appli_cotis_etab',
    {
        year: {
            type: Sequelize.STRING(255),
            allowNull: false,
            primaryKey: true,
            field: 'annee'
        },
        countLTP: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'somme_LTP'
        },
        totalLTP: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'caLTP'
        },
        countHC: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'somme_HC'
        },
        totalHC: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'caHC'
        },
        countApprentice: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'somme_apprentis'
        },
        totalApprentice: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'ca_apprentis'
        },
        countTraineeHours: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'nb_heures_stagiaires'
        },
        totalCFC: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'ca_cfc'
        },
        countCollegeEmployer: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'somme_college_employeur'
        },
        totalCollegeEmployer: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'ca_college_employeur'
        },
        fixedPart: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'montant_part_fixe'
        }
    },
    {
        sequelize,
        tableName: 'vue_temp_cotis_annuelle_etudiant',
        timestamps: false
    }
);
SubscriptionFeesYearlyPrevisioned.sync = () => Promise.resolve();
SubscriptionFeesYearlyPrevisioned.sortableFields = ['year'];

export default SubscriptionFeesYearlyPrevisioned;
