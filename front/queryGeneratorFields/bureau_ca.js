const bureau_ca = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'bureau_ca',
    subfields: {
        id_bureau_ca: {
            label: 'id_bureau_ca',
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
        }
    }
};
export default bureau_ca;
