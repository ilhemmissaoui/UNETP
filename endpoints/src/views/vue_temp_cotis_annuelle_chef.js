module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_temp_cotis_annuelle_chef',
        {
            annee: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            nb_chef: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            tot_montant_calcule: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            },
            tot_montant_personnalise: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            },
            montant_total: {
                type: DataTypes.DECIMAL(42, 2),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_temp_cotis_annuelle_chef',
            timestamps: false
        }
    );
};
