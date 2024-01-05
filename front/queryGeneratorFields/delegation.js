const delegation = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'delegation',
    subfields: {
        id_delegation: {
            label: 'id_delegation',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        reference: {
            label: 'reference',
            type: 'text',
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
export default delegation;
