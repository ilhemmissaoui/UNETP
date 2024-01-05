const diplome_domaine = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome_domaine',
    subfields: {
        id_diplome_domaine: {
            label: 'id_diplome_domaine',
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
export default diplome_domaine;
