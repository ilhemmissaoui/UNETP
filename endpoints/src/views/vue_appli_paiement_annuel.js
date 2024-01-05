module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_paiement_annuel',
        {
            id_cotisation_parametre: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            annee: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            paiements_ces: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            paiements_etabs: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            },
            montant_part_fixe: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            },
            total: {
                type: DataTypes.DECIMAL(43, 2),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_paiement_annuel',
            timestamps: false
        }
    );
};
