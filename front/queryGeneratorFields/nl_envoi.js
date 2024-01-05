const nl_envoi = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'nl_envoi',
    subfields: {
        id_nl_envoi: {
            label: 'id_nl_envoi',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_nl_modele: {
            label: 'id_nl_modele',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        description: {
            label: 'description',
            type: 'text',
            valueSources: ['value']
        },
        email_de: {
            label: 'email_de',
            type: 'text',
            valueSources: ['value']
        },
        libelle_de: {
            label: 'libelle_de',
            type: 'text',
            valueSources: ['value']
        },
        sujet: {
            label: 'sujet',
            type: 'text',
            valueSources: ['value']
        },
        texte: {
            label: 'texte',
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
        type_coordonnee: {
            label: 'type_coordonnee',
            type: 'text',
            valueSources: ['value']
        },
        date_envoi: {
            label: 'date_envoi',
            type: 'datetime',
            valueSources: ['value']
        },

        nb_destinataires: {
            label: 'nb_destinataires',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        duree: {
            label: 'duree',
            type: 'text',
            valueSources: ['value']
        },
        logs: {
            label: 'logs',
            type: 'text',
            valueSources: ['value']
        },
        piece_jointe: {
            label: 'piece_jointe',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default nl_envoi;
