module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_bordereau',
        {
            cle_etab: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            date_depot: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            calcule_sc_hc: {
                type: DataTypes.DECIMAL(46, 2),
                allowNull: true
            },
            calcule_apprentis: {
                type: DataTypes.DECIMAL(39, 2),
                allowNull: true
            },
            calcule_cfc: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            calcule_college_employeur: {
                type: DataTypes.DECIMAL(39, 2),
                allowNull: true
            },
            calcule_ce: {
                type: DataTypes.DECIMAL(20, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            montant_part_fixe: {
                type: DataTypes.DECIMAL(20, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            montant_total: {
                type: DataTypes.DECIMAL(21, 2),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_bordereau',
            timestamps: false
        }
    );
};
