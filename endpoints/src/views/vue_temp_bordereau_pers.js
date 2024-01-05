module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_temp_bordereau_pers',
        {
            id_personne: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            id_cotisation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            date_depot: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            ref_paiement: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            montant_total: {
                type: DataTypes.DECIMAL(20, 2),
                allowNull: false,
                defaultValue: 0.0
            },
            id_unitorg: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_temp_bordereau_pers',
            timestamps: false
        }
    );
};
