const cotisation = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation',
    subfields: {
        id_cotisation: {
            label: 'id_cotisation',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_cotisation_parametre: {
            label: 'id_cotisation_parametre',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_unitorg: {
            label: 'id_unitorg',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_personne: {
            label: 'id_personne',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_cotisation_syndicat: {
            label: 'id_cotisation_syndicat',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        montant_calcule: {
            label: 'montant_calcule',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        montant_personnalise: {
            label: 'montant_personnalise',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        montant_part_fixe: {
            label: 'montant_part_fixe',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        statut: {
            label: 'statut',
            type: 'text',
            valueSources: ['value']
        },
        nb_relance: {
            label: 'nb_relance',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        date_last_relance: {
            label: 'date_last_relance',
            type: 'date',
            valueSources: ['value']
        }
    }
};
export default cotisation;
