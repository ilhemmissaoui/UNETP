const historique = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'historique',
    subfields: {
        id_historique: {
            label: 'id_historique',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_type_historique: {
            label: 'id_type_historique',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_unitorg: {
            label: 'id_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_personne: {
            label: 'id_personne',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        libelle: {
            label: 'libelle',
            type: 'text',
            valueSources: ['value']
        },
        commentaire: {
            label: 'commentaire',
            type: 'text',
            valueSources: ['value']
        },
        date: {
            label: 'date',
            type: 'date',
            valueSources: ['value']
        },

        date_debut: {
            label: 'date_debut',
            type: 'date',
            valueSources: ['value']
        },

        date_fin: {
            label: 'date_fin',
            type: 'date',
            valueSources: ['value']
        },

        date_creation: {
            label: 'date_creation',
            type: 'datetime',
            valueSources: ['value']
        },

        date_modification: {
            label: 'date_modification',
            type: 'datetime',
            valueSources: ['value']
        },

        createur: {
            label: 'createur',
            type: 'text',
            valueSources: ['value']
        },
        modificateur: {
            label: 'modificateur',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default historique;
