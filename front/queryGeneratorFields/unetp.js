const unetp = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unetp',
    subfields: {
        id_unetp: {
            label: 'id_unetp',
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
export default unetp;
