import Sequelize from 'sequelize';

import sequelize from '../db';

const OrganizationType = sequelize.define(
    'organizationType',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_type_unitorg'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle',
            comment:
                'Exemples : \nZone géographique, Batiment, Service, Ecole, Groupe scolaire, Hopital, etc.'
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'type_unitorg',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_type_unitorg' }]
            }
        ]
    }
);
export default OrganizationType;
