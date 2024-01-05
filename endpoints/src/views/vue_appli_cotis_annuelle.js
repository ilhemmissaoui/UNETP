module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_cotis_annuelle',
        {
            annee: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            somme_LTP: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: false,
                defaultValue: 0
            },
            caLTP: {
                type: DataTypes.DECIMAL(64, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            somme_HC: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: false,
                defaultValue: 0
            },
            caHC: {
                type: DataTypes.DECIMAL(64, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            somme_apprentis: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: false,
                defaultValue: 0
            },
            ca_apprentis: {
                type: DataTypes.DECIMAL(61, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            nb_heures_stagiaires: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0
            },
            ca_cfc: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0
            },
            somme_college_employeur: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: false,
                defaultValue: 0
            },
            ca_college_employeur: {
                type: DataTypes.DECIMAL(61, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            ca_ce: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            montant_part_fixe: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: false,
                defaultValue: 0.0
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_cotis_annuelle',
            timestamps: false
        }
    );
};
