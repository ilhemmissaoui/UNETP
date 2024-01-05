module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_cotis_etab_perso',
        {
            id_unitorg: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nom: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            archived: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            numero_etablissement: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            cle_etablissement: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            annee: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            id_cotisation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            statut_etab: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            id_historique_capacite: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            nb_sc_lp: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_sc_lt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_sc_bts: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_sc_sup: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            total_sc: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_hc_lp: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_hc_lt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_hc_bts: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_hc_sup: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            total_hc: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_apprentis: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            nb_heures: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0
            },
            nb_college_employeur: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            ids_personne: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            cot_persos: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            syndicats: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            statuts_perso: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            statut_final: {
                type: DataTypes.STRING(13),
                allowNull: false,
                defaultValue: ''
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_cotis_etab_perso',
            timestamps: false
        }
    );
};
