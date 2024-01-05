module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_cotis_syndic',
        {
            id_personne: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cot_perso: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            annee: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            cot_etab: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            syndicat: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ''
            },
            statut_perso: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_cotis_syndic',
            timestamps: false
        }
    );
};
