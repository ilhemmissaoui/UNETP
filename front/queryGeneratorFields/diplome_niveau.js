const diplome_niveau = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome_niveau',
    subfields: {
        id_diplome_niveau: {
            label: 'id_diplome_niveau',
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
export default diplome_niveau;
