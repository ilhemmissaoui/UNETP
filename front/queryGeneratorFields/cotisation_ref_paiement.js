const cotisation_ref_paiement = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation_ref_paiement',
    subfields: {
        id_cotisation_ref_paiement: {
            label: 'id_cotisation_ref_paiement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        type_paiement: {
            label: 'type_paiement',
            type: 'text',
            valueSources: ['value']
        },
        date_depot: {
            label: 'date_depot',
            type: 'date',
            valueSources: ['value']
        },

        date_encaissement: {
            label: 'date_encaissement',
            type: 'date',
            valueSources: ['value']
        },

        commentaire: {
            label: 'commentaire',
            type: 'text',
            valueSources: ['value']
        },
        reference: {
            label: 'reference',
            type: 'text',
            valueSources: ['value']
        },
        banque_statut: {
            label: 'banque_statut',
            type: 'text',
            valueSources: ['value']
        },
        banque_reference: {
            label: 'banque_reference',
            type: 'text',
            valueSources: ['value']
        },
        banque_logs: {
            label: 'banque_logs',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default cotisation_ref_paiement;
