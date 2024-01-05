import Sequelize from 'sequelize';

import sequelize from '../db';

const A = sequelize.define(
    'ra_champ',
    {
        id_ra_champ: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        libelle: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: "le nom affiché à l'écran\nExemple : Nom"
        },
        nom: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'le nom du champ\nExemple : nomComplet'
        },
        classe: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'la classe auquel le champ appartient\nExemple : Service'
        }
    },
    {
        sequelize,
        tableName: 'ra_champ',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_ra_champ' }]
            }
        ]
    }
);
export default A;
