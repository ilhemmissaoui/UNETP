module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_temp_cotis_annuelle_etudiant',
        {
            annee: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            somme_LTP: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: true
            },
            caLTP: {
                type: DataTypes.DECIMAL(64, 2),
                allowNull: true
            },
            somme_HC: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: true
            },
            caHC: {
                type: DataTypes.DECIMAL(64, 2),
                allowNull: true
            },
            somme_apprentis: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: true
            },
            ca_apprentis: {
                type: DataTypes.DECIMAL(61, 2),
                allowNull: true
            },
            nb_heures_stagiaires: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            ca_cfc: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            somme_college_employeur: {
                type: DataTypes.DECIMAL(41, 0),
                allowNull: true
            },
            ca_college_employeur: {
                type: DataTypes.DECIMAL(61, 2),
                allowNull: true
            },
            montant_part_fixe: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_temp_cotis_annuelle_etudiant',
            timestamps: false
        }
    );
};
