import Sequelize from 'sequelize';

import sequelize from '../db';

const Guardianship = sequelize.define(
    'guardianship',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_tutelle'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        }
    },
    {
        sequelize,
        tableName: 'tutelle',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_tutelle' }]
            }
        ]
    }
);
export default Guardianship;
