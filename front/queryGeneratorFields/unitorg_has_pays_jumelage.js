const unitorg_has_pays_jumelage = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg_has_pays_jumelage',
    subfields: {
        id_etablisement_jumelage: {
            label: 'id_etablisement_jumelage',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_pays_jumelage: {
            label: 'id_pays_jumelage',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default unitorg_has_pays_jumelage;
