import Sequelize from 'sequelize';

import sequelize from '../db';

const SubscriptionParams = sequelize.define(
    'subscriptionParams',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_cotisation_parametre'
        },
        year: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'annee'
        },
        remindDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Pour le cron',
            field: 'date_appel'
        },
        lastCallDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'last_date_appel'
        },
        lastLogCall: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'last_log_appel'
        },
        schoolContractAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Montant Sous Contrat Collège',
            field: 'sc_college'
        },
        lpContractAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Montant Sous Contrat LP',
            field: 'sc_lp'
        },
        lgtContractAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Montant Sous Contrat LT',
            field: 'sc_lt'
        },
        btsContractAmount: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Montant Sous Contrat BTS',
            field: 'sc_bts'
        },
        scSup: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'sc_sup'
        },
        scOther: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'sc_autre'
        },
        lpWithoutContract: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Hors Contrat LP',
            field: 'hc_lp'
        },
        ltWithoutContract: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Hors Contrat LT',
            field: 'hc_lt'
        },
        btsWithoutContract: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Hors Contrat BTS',
            field: 'hc_bts'
        },
        supWithoutContract: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Hors Contrat Supérieur',
            field: 'hc_sup'
        },
        hcOther: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'hc_autre'
        },
        cfaUfa: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'cfa_ufa'
        },
        cfpCfc: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'cfp_cfc'
        },
        employerCollegeOperation: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'fonctionnement_college_employeur'
        },
        headEstablishment: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            comment: 'Chef établissement',
            field: 'chef_etablissement'
        },
        otherLeader: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'autre_dirigeant'
        },
        oldHeadEstablishment: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'ancien'
        },
        fixedPart034: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'part_fixe_034'
        },
        fixedPart12: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true,
            field: 'part_fixe_12'
        }
    },
    {
        sequelize,
        tableName: 'cotisation_parametre',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_cotisation_parametre' }]
            },
            {
                name: 'annee',
                using: 'BTREE',
                fields: [{ name: 'annee' }]
            }
        ]
    }
);
export default SubscriptionParams;
