const demande = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'demande',
    subfields: {
        id_demande: {
            label: 'id_demande',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        user_id: {
            label: 'user_id',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        date_creation: {
            label: 'date_creation',
            type: 'datetime',
            valueSources: ['value']
        },

        json: {
            label: 'json',
            type: 'text',
            valueSources: ['value']
        },
        action: {
            label: 'action',
            type: 'text',
            valueSources: ['value']
        },
        nom_objet: {
            label: 'nom_objet',
            type: 'text',
            valueSources: ['value']
        },
        id_objet: {
            label: 'id_objet',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        commentaire: {
            label: 'commentaire',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default demande;
