const diplome_fonction = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome_fonction',
    subfields: {
        id_diplome_fonction: {
            label: 'id_diplome_fonction',
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
export default diplome_fonction;
