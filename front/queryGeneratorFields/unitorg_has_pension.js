const unitorg_has_pension = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg_has_pension',
    subfields: {
        id_etablissement: {
            label: 'id_etablissement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_pension: {
            label: 'id_pension',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default unitorg_has_pension;
