import Sequelize from 'sequelize';

import sequelize from '../db';

const AdvancedSearchRequest = sequelize.define(
    'advancedSearchRequest',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_ra_requete'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: "le nom de la requête afficher à l'écran",
            field: 'libelle'
        },
        request: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'la requete SQL',
            field: 'requete'
        },
        fields: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'fields'
        },
        mode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ordre: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "ordre de tri pour l'affichage"
        },
        tree: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: "ordre de tri pour l'affichage",
            field: 'tree'
        }
    },
    {
        sequelize,
        tableName: 'ra_requete',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_ra_requete' }]
            }
        ]
    }
);
export default AdvancedSearchRequest;
