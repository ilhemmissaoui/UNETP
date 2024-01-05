const diplome_groupe = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome_groupe',
    subfields: {
        id_diplome_groupe: {
            label: 'id_diplome_groupe',
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
export default diplome_groupe;
