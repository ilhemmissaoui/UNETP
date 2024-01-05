import Sequelize from 'sequelize';

import sequelize from '../db';

const Slippage = sequelize.define(
    'vue_temp_bordereau_etab',
    {
        SubscriptionFeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            primaryKey: true,
            field: 'id_cotisation'
        },
        establishmentKey: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'cle_etab'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_unitorg'
        },
        SubscriptionParamId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'id_cotisation_parametre'
        },
        year: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'annee'
        },
        date_depot: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_depot'
        },
        ref_paiement: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'ref_paiement'
        },
        calcule_sc_hc: {
            type: Sequelize.DECIMAL(46, 2),
            allowNull: true,
            field: 'calcule_sc_hc'
        },
        calcule_apprentis: {
            type: Sequelize.DECIMAL(39, 2),
            allowNull: true,
            field: 'calcule_apprentis'
        },
        calcule_cfc: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            field: 'calcule_cfc'
        },
        calcule_college_employeur: {
            type: Sequelize.DECIMAL(39, 2),
            allowNull: true,
            field: 'calcule_college_employeur'
        },
        fixedPart: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: false,
            defaultValue: 0.0,
            field: 'montant_part_fixe'
        },
        montant_total: {
            type: Sequelize.DECIMAL(20, 2),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'vue_temp_bordereau_etab',
        timestamps: false
    }
);
Slippage.sync = () => Promise.resolve();
Slippage.sortableFields = ['id_cotisation'];
export default Slippage;
