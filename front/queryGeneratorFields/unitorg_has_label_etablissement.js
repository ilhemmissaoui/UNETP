const unitorg_has_label_etablissement = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg_has_label_etablissement',
    subfields: {
        id_unitorg: {
            label: 'id_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_label_etablissement: {
            label: 'id_label_etablissement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default unitorg_has_label_etablissement;
