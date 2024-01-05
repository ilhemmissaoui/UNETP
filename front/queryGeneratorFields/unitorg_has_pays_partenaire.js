const unitorg_has_pays_partenaire = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg_has_pays_partenaire',
    subfields: {
        id_etablissement_partenaire: {
            label: 'id_etablissement_partenaire',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_pays_partenaire: {
            label: 'id_pays_partenaire',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default unitorg_has_pays_partenaire;
