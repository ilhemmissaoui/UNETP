const tutelle = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'tutelle',
    subfields: {
        id_tutelle: {
            label: 'id_tutelle',
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
export default tutelle;
