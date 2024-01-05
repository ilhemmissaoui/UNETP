const pays = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'pays',
    subfields: {
        id_pays: {
            label: 'id_pays',
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
        code: {
            label: 'code',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default pays;
