const cotisation_has_cotisation = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation_has_cotisation',
    subfields: {
        id_cotisation_etablissement: {
            label: 'id_cotisation_etablissement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_cotisation_personne: {
            label: 'id_cotisation_personne',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default cotisation_has_cotisation;
