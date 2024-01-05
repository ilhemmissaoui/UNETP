import Sequelize from 'sequelize';

import sequelize from '../db';

const Civility = sequelize.define(
    'civility',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_civilite'
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Monsieur',
            field: 'nom'
        },
        abbreviation: {
            type: Sequelize.STRING(45),
            allowNull: true,
            comment: 'M.',
            field: 'abbreviation'
        },
        gender: {
            type: Sequelize.ENUM('M', 'F', 'Mixte'),
            allowNull: true,
            field: 'genre'
        },
        rank: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "Ordre de tri à l'affichage",
            field: 'ordre'
        }
    },
    {
        sequelize,
        tableName: 'civilite',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_civilite' }]
            }
        ]
    }
);
export default Civility;
