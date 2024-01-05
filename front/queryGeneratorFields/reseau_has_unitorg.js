const reseau_has_unitorg = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'reseau_has_unitorg',
    subfields: {
        id_reseau: {
            label: 'id_reseau',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_etablissement: {
            label: 'id_etablissement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default reseau_has_unitorg;
