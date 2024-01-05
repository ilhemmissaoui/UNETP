const unitorg_has_tutelle = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg_has_tutelle',
    subfields: {
        id_etablissement: {
            label: 'id_etablissement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_tutelle: {
            label: 'id_tutelle',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default unitorg_has_tutelle;
