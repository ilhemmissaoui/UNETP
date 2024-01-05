const label_etablissement = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'label_etablissement',
    subfields: {
        id_label_etablissement: {
            label: 'id_label_etablissement',
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
        }
    }
};
export default label_etablissement;
