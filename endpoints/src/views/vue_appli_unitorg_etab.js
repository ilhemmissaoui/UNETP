module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_appli_unitorg_etab',
        {
            id_unitorg: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            cle_etablissement: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            numero_etablissement: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            nom: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            academie: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            departement: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            delegation: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            relation_unetp: {
                type: DataTypes.ENUM('membre adhérent', 'membre associé', 'non membre'),
                allowNull: true
            },
            mixite: {
                type: DataTypes.ENUM('mixte', 'fille', 'garçon', 'nc'),
                allowNull: true
            },
            label_etablissement: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            jumelage: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            pays_partenaires: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            pension: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            tutelle: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            date_premiere_adhesion: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            nom_coordonnee: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Exemple : \n- personnelle\n- professionnelle'
            },
            adresse_destinataire: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Permet de reprendre les nom-prénom ou le nom de l'entreprise."
            },
            adresse_complement_destinataire: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            adresse_ligne1: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            adresse_ligne2: {
                type: DataTypes.STRING(301),
                allowNull: true
            },
            adresse_ligne3: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            adresse_ville: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            telephone: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            fax: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            mobile: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            site_web: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            chef_etablissement: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            commentaires_publics: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            commentaires_formation: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            commentaires_prives: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            date_creation: {
                type: DataTypes.DATE,
                allowNull: true
            },
            date_derniere_modification: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: 'date de dernière modification'
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                comment: 'Si on souhaite ne pas supprimer physiquement les éléments.'
            },
            archived: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_appli_unitorg_etab',
            timestamps: false
        }
    );
};
