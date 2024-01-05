const ra_champ = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'ra_champ',
    subfields: {
        id_ra_champ: {
            label: 'id_ra_champ',
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
        nom: {
            label: 'nom',
            type: 'text',
            valueSources: ['value']
        },
        classe: {
            label: 'classe',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default ra_champ;
