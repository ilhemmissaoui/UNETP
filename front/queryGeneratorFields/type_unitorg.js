const type_unitorg = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'type_unitorg',
    subfields: {
        id_type_unitorg: {
            label: 'id_type_unitorg',
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
        description: {
            label: 'description',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default type_unitorg;
