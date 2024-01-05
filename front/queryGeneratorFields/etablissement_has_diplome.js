const etablissement_has_diplome = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'etablissement_has_diplome',
    subfields: {
        id_etablissement_has_diplome: {
            label: 'id_etablissement_has_diplome',
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
        },
        id_diplome: {
            label: 'id_diplome',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        complement: {
            label: 'complement',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default etablissement_has_diplome;
