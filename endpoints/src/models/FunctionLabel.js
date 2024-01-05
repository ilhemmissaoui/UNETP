import Sequelize from 'sequelize';

import sequelize from '../db';
import yup from '../lib/yup';

const FunctionLabel = sequelize.define(
    'functionLabel',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_label_fonction'
        },
        organizationTypeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'id_type_unitorg',
            comment:
                'Si une fonction est applicable pour deux unitorg, alors il s\'agit de 2 fonctions portant le même nom. Peut être nul pour des cas comme "député".',
            references: {
                model: 'type_unitorg',
                key: 'id_type_unitorg'
            }
        },
        singularMaleName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom_masculin',
            comment: 'directeur'
        },
        singularFemaleName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom_feminin',
            comment: 'directrice'
        },
        pluralMaleName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom_pluriel_masculin',
            comment: 'directeurs'
        },
        pluralFemaleName: {
            type: Sequelize.STRING(255),
            allowNull: true,
            field: 'nom_pluriel_feminin',
            comment: 'directrices'
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        isHeadMaster: {
            type: Sequelize.BOOLEAN,
            field: 'chef_etablissement',
            allowNull: false
        },
        isPhoneNumber: {
            type: Sequelize.BOOLEAN,
            field: 'annuaire',
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'label_fonction',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id_label_fonction' }]
            },
            {
                name: 'fk_label_fonction_type_unitorg',
                using: 'BTREE',
                fields: [{ name: 'id_type_unitorg' }]
            },
            {
                name: 'chef_etablissement',
                using: 'BTREE',
                fields: [{ name: 'chef_etablissement' }]
            },
            {
                name: 'annuaire',
                using: 'BTREE',
                fields: [{ name: 'annuaire' }]
            }
        ]
    }
);

FunctionLabel.filterOptions = {
    organizationTypeId: yup.number()
};
export default FunctionLabel;
