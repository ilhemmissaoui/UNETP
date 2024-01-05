import Sequelize from 'sequelize';

import sequelize from '../db';

const Function = sequelize.define(
    'function',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_fonction'
        },
        labelId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'prise de fonction "président"',
            references: {
                model: 'label_fonction',
                key: 'id_label_fonction'
            },
            field: 'id_label_fonction'
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unitorg',
                key: 'id_unitorg'
            },
            field: 'id_unitorg'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'exemples :\n- Dupont président de telle organisation\n- Dupont président\n',
            references: {
                model: 'personne',
                key: 'id_personne'
            },
            field: 'id_personne'
        },
        startDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_debut'
        },
        endDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'date_fin'
        },
        type: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'exemple : \n- poste\n- lien familiale'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_creation'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'date_modification'
        },
        createdBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'createur'
        },
        updatedBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'modificateur'
        }
    },
    {
        sequelize,
        tableName: 'fonction',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_fonction' }]
            },
            {
                name: 'fk_fonction_personne',
                using: 'BTREE',
                fields: [{ name: 'id_personne' }]
            },
            {
                name: 'fk_fonction_label_fonction',
                using: 'BTREE',
                fields: [{ name: 'id_label_fonction' }]
            },
            {
                name: 'fk_fonction_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);
export default Function;
