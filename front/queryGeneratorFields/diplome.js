const diplome = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'diplome',
    subfields: {
        id_diplome: {
            label: 'id_diplome',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_type: {
            label: 'id_diplome_type',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_groupe: {
            label: 'id_diplome_groupe',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_sous_groupe: {
            label: 'id_diplome_sous_groupe',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_domaine: {
            label: 'id_diplome_domaine',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_niveau: {
            label: 'id_diplome_niveau',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_specialite: {
            label: 'id_diplome_specialite',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_diplome_fonction: {
            label: 'id_diplome_fonction',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        reference: {
            label: 'reference',
            type: 'text',
            valueSources: ['value']
        },
        nom: {
            label: 'nom',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default diplome;
