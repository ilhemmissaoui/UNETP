import Sequelize from 'sequelize';

import sequelize from '../db';

const EstablishmentLabel = sequelize.define(
    'establishmentLabel',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_label_etablissement'
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'libelle'
        }
    },
    {
        sequelize,
        tableName: 'label_etablissement',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_label_etablissement' }]
            }
        ]
    }
);
export default EstablishmentLabel;
