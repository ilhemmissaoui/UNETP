module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_temp_paiements_ce',
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
            paiements: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_temp_paiements_ce',
            timestamps: false
        }
    );
};
