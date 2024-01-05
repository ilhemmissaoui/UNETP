import Sequelize from 'sequelize';

import sequelize from '../db';

const History = sequelize.define(
    'history',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_historique'
        },
        historyIdType: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'type_historique',
                key: 'id_type_historique'
            },
            field: 'id_type_historique'
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
            references: {
                model: 'personne',
                key: 'id_personne'
            },
            field: 'id_personne'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: true
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
        },
        finalDate: {
            type: Sequelize.VIRTUAL(Sequelize.DATE, ['finalDate'])
        }
    },
    {
        sequelize,
        tableName: 'historique',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_historique' }]
            },
            {
                name: 'fk_historique_type_historique',
                using: 'BTREE',
                fields: [{ name: 'id_type_historique' }]
            },
            {
                name: 'fk_historique_personne',
                using: 'BTREE',
                fields: [{ name: 'id_personne' }]
            },
            {
                name: 'fk_historique_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_unitorg' }]
            }
        ]
    }
);

export default History;
