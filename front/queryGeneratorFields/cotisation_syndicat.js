const cotisation_syndicat = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation_syndicat',
    subfields: {
        id_cotisation_syndicat: {
            label: 'id_cotisation_syndicat',
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
        description: {
            label: 'description',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default cotisation_syndicat;
