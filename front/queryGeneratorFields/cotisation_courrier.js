const cotisation_courrier = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation_courrier',
    subfields: {
        id_cotisation_courrier: {
            label: 'id_cotisation_courrier',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        msg_appel_cotisation: {
            label: 'msg_appel_cotisation',
            type: 'text',
            valueSources: ['value']
        },
        msg_relance: {
            label: 'msg_relance',
            type: 'text',
            valueSources: ['value']
        },
        msg_gel_compte: {
            label: 'msg_gel_compte',
            type: 'text',
            valueSources: ['value']
        },
        sujet_appel_cotisation: {
            label: 'sujet_appel_cotisation',
            type: 'text',
            valueSources: ['value']
        },
        sujet_relance: {
            label: 'sujet_relance',
            type: 'text',
            valueSources: ['value']
        },
        sujet_gel_compte: {
            label: 'sujet_gel_compte',
            type: 'text',
            valueSources: ['value']
        },
        expediteur_appel_cotisation: {
            label: 'expediteur_appel_cotisation',
            type: 'text',
            valueSources: ['value']
        },
        expediteur_relance: {
            label: 'expediteur_relance',
            type: 'text',
            valueSources: ['value']
        },
        expediteur_gel_compte: {
            label: 'expediteur_gel_compte',
            type: 'text',
            valueSources: ['value']
        },
        frequence_relance: {
            label: 'frequence_relance',
            type: 'text',
            valueSources: ['value']
        },
        seuil_gel: {
            label: 'seuil_gel',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default cotisation_courrier;
