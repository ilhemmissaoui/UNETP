const fonction = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'fonction',
    subfields: {
        id_fonction: {
            label: 'id_fonction',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_label_fonction: {
            label: 'id_label_fonction',
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

        type: {
            label: 'type',
            type: 'text',
            valueSources: ['value']
        },
        commentaire: {
            label: 'commentaire',
            type: 'text',
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
export default fonction;
