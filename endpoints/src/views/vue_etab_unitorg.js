module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'vue_etab_unitorg',
        {
            id_unitorg: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            'Cle Etablissement': {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            Nom: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            Académie: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            Département: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Délégation: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            Description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Relation UNETP': {
                type: DataTypes.ENUM('membre adhérent', 'membre associé', 'non membre'),
                allowNull: true
            },
            Mixite: {
                type: DataTypes.ENUM('mixte', 'fille', 'garçon', 'nc'),
                allowNull: true
            },
            "Label d'établissement": {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Jumelage: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Pays partenaires': {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Pension: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Tutelle: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Date de première adhésion': {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            'Nom de la coordonnée': {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Exemple : \n- personnelle\n- professionnelle'
            },
            'Adresse destinataire': {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Permet de reprendre les nom-prénom ou le nom de l'entreprise."
            },
            'Adresse complément destinataire': {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            'Adresse Ligne 1': {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            'Adresse Ligne 2': {
                type: DataTypes.STRING(301),
                allowNull: true
            },
            'Adresse Ligne 3': {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            'Adresse ville': {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Téléphone: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            Fax: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            Mobile: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            Email: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            'Site Web': {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            "Chef d'établissement": {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Commentaires publics': {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Commentaires formation': {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Commentaires privés': {
                type: DataTypes.TEXT,
                allowNull: true
            },
            'Date de création': {
                type: DataTypes.STRING(10),
                allowNull: true
            },
            'Date de dernière modification': {
                type: DataTypes.STRING(10),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'vue_etab_unitorg',
            timestamps: false
        }
    );
};
