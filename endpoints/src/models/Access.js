import Sequelize from 'sequelize';

import sequelize from '../db';

const Access = sequelize.define(
    'access',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_acces'
        },
        username: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'login'
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'mdp'
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'profil'
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'disabled'
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'commentaire'
        },
        lastViewed: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Date de dernière connexion',
            field: 'date_connexion'
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
        updateBy: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'modificateur'
        },
        hashCode: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'hash_code'
        }
    },
    {
        sequelize,
        tableName: 'acces',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_acces' }]
            },
            {
                name: 'profil',
                using: 'BTREE',
                fields: [{ name: 'profil' }]
            },
            {
                name: 'disabled',
                using: 'BTREE',
                fields: [{ name: 'disabled' }]
            },
            {
                name: 'hash_code',
                using: 'BTREE',
                fields: [{ name: 'hash_code' }]
            }
        ]
    }
);
export default Access;
