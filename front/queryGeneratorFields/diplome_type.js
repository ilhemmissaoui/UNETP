const diplome_type = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome_type',
    subfields: {
        id_diplome_type: {
            label: 'id_diplome_type',
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
export default diplome_type;
