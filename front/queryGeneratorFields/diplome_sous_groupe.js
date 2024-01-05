const diplome_sous_groupe = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome_sous_groupe',
    subfields: {
        id_diplome_sous_groupe: {
            label: 'id_diplome_sous_groupe',
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
export default diplome_sous_groupe;
