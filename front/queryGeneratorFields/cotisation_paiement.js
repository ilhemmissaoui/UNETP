const cotisation_paiement = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation_paiement',
    subfields: {
        id_cotisation_paiement: {
            label: 'id_cotisation_paiement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_cotisation: {
            label: 'id_cotisation',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_cotisation_ref_paiement: {
            label: 'id_cotisation_ref_paiement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        montant: {
            label: 'montant',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default cotisation_paiement;
