const label_fonction = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'label_fonction',
    subfields: {
        id_label_fonction: {
            label: 'id_label_fonction',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_type_unitorg: {
            label: 'id_type_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        nom_masculin: {
            label: 'nom_masculin',
            type: 'text',
            valueSources: ['value']
        },
        nom_feminin: {
            label: 'nom_feminin',
            type: 'text',
            valueSources: ['value']
        },
        nom_pluriel_masculin: {
            label: 'nom_pluriel_masculin',
            type: 'text',
            valueSources: ['value']
        },
        nom_pluriel_feminin: {
            label: 'nom_pluriel_feminin',
            type: 'text',
            valueSources: ['value']
        },
        description: {
            label: 'description',
            type: 'text',
            valueSources: ['value']
        },
        chef_etablissement: {
            label: 'chef_etablissement',
            type: 'boolean',
            valueSources: ['value']
        },
        annuaire: {
            label: 'annuaire',
            type: 'boolean',
            valueSources: ['value']
        }
    }
};
export default label_fonction;
