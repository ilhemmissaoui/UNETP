const nl_modele = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'nl_modele',
    subfields: {
        id_nl_modele: {
            label: 'id_nl_modele',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        nom: {
            label: 'nom',
            type: 'text',
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
        emails_test: {
            label: 'emails_test',
            type: 'text',
            valueSources: ['value']
        },
        type_coordonnee: {
            label: 'type_coordonnee',
            type: 'text',
            valueSources: ['value']
        },
        date_creation: {
            label: 'date_creation',
            type: 'datetime',
            valueSources: ['value']
        },

        date_modification: {
            label: 'date_modification',
            type: 'datetime',
            valueSources: ['value']
        },

        nb_envois: {
            label: 'nb_envois',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        date_dernier_envoi: {
            label: 'date_dernier_envoi',
            type: 'datetime',
            valueSources: ['value']
        }
    }
};
export default nl_modele;
