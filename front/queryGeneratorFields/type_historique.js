const type_historique = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'type_historique',
    subfields: {
        id_type_historique: {
            label: 'id_type_historique',
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
export default type_historique;
