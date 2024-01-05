const unitorg = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg',
    subfields: {
        id_unitorg: {
            label: 'id_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_type_unitorg: {
            label: 'id_type_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        nom: {
            label: 'nom',
            type: 'text',
            valueSources: ['value']
        },
        description: {
            label: 'description',
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
        },
        deleted: {
            label: 'deleted',
            type: 'boolean',
            valueSources: ['value']
        },
        archived: {
            label: 'archived',
            type: 'boolean',
            valueSources: ['value']
        },
        file_name_logo: {
            label: 'file_name_logo',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default unitorg;
