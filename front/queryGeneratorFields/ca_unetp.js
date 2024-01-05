const ca_unetp = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'ca_unetp',
    subfields: {
        id_ca_unetp: {
            label: 'id_ca_unetp',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        college: {
            label: 'college',
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
export default ca_unetp;
