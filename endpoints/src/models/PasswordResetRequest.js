import Sequelize from 'sequelize';

import sequelize from '../db';

const PasswordResetRequest = sequelize.define(
    'passwordResetRequest',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at'
        }
    },
    {
        sequelize,
        tableName: 'password_reset_request',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id' }]
            },
            {
                name: 'fk_password_reset_user',
                using: 'BTREE',
                fields: [{ name: 'user_id' }]
            }
        ]
    }
);

export default PasswordResetRequest;
