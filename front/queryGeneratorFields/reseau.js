const reseau = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'reseau',
    subfields: {
        id_reseau: {
            label: 'id_reseau',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        date_creation_reseau: {
            label: 'date_creation_reseau',
            type: 'date',
            valueSources: ['value']
        },

        id_unitorg: {
            label: 'id_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default reseau;
