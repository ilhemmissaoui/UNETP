const ra_requete = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'ra_requete',
    subfields: {
        id_ra_requete: {
            label: 'id_ra_requete',
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
        requete: {
            label: 'requete',
            type: 'text',
            valueSources: ['value']
        },
        classe: {
            label: 'classe',
            type: 'text',
            valueSources: ['value']
        },
        mode: {
            label: 'mode',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        ordre: {
            label: 'ordre',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default ra_requete;
