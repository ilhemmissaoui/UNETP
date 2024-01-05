import Sequelize from 'sequelize';

import sequelize from '../db';

const CapacityHistory = sequelize.define(
    'capacityHistory',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_historique_capacite'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        },
        year: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'annee'
        },
        apprenticesCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_apprentis'
        },
        internsHoursCount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'nb_heures_stagiaire'
        },
        collegeContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_sous_contrat_college'
        },
        lpContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_sous_contrat_lp'
        },
        lgtContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_sous_contrat_lt'
        },
        btsContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_sous_contrat_bts'
        },
        supContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_sous_contrat_sup'
        },
        otherContractStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_sous_contrat_autre'
        },
        withoutContractLpStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_hors_contrat_lp'
        },
        withoutContractLgtStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_hors_contrat_lt'
        },
        withoutContractBtsStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_hors_contrat_bts'
        },
        withoutContractSupStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_hors_contrat_sup'
        },
        withoutContractOtherStudentsCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_hors_contrat_autre'
        },
        studentEmployerCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_eleves_college_employeur'
        },
        cfaUfaApprenticesCount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'nb_apprentis_cfa_ufa'
        },
        cfpCfcInternsHoursCount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'nb_heures_stagiaire_cfp_cfc'
        }
    },
    {
        sequelize,
        tableName: 'historique_capacite',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_historique_capacite' }]
            },
            {
                name: 'fk_historique_capacite_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            },
            {
                name: 'annee',
                using: 'BTREE',
                fields: [{ name: 'annee' }]
            }
        ]
    }
);
export default CapacityHistory;
