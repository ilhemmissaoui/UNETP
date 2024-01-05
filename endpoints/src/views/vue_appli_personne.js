module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_personne',
        {
            id_personne: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nb: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            civ_abbr: {
                type: DataTypes.STRING(45),
                allowNull: true,
                comment: 'M.'
            },
            civ_complet: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Monsieur'
            },
            particule: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            nom_naissance: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            nom: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            prenom: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            unitorgs: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            code_departements: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            numeros_etablissement: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            cles_etablissement: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ids_label_fonction: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ids_type_unitorg: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            date_derniere_modification: {
                type: DataTypes.DATE,
                allowNull: true
            },
            relation_unetp: {
                type: DataTypes.ENUM(
                    'membre adhérent',
                    'membre associé',
                    'membre correspondant',
                    'extérieur',
                    'nc'
                ),
                allowNull: true
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                comment: 'Si on souhaite ne pas supprimer physiquement les éléments.'
            },
            archived: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            email_defaut: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_personne',
            timestamps: false
        }
    );
};
