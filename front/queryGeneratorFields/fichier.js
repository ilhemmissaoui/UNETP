const fichier = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'fichier',
    subfields: {
        id_fichier: {
            label: 'id_fichier',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_nl_envoi: {
            label: 'id_nl_envoi',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        filename: {
            label: 'filename',
            type: 'text',
            valueSources: ['value']
        },
        client_filename: {
            label: 'client_filename',
            type: 'text',
            valueSources: ['value']
        },
        content_type: {
            label: 'content_type',
            type: 'text',
            valueSources: ['value']
        },
        fichier: {
            label: 'fichier',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'image', title: 'image' },
                    { value: 'document', title: 'document' }
                ]
            }
        },

        extension: {
            label: 'extension',
            type: 'text',
            valueSources: ['value']
        },
        poids: {
            label: 'poids',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        largeur: {
            label: 'largeur',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        hauteur: {
            label: 'hauteur',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        date_depot: {
            label: 'date_depot',
            type: 'date',
            valueSources: ['value']
        },

        libelle: {
            label: 'libelle',
            type: 'text',
            valueSources: ['value']
        },
        commentaire: {
            label: 'commentaire',
            type: 'text',
            valueSources: ['value']
        },
        type_usage: {
            label: 'type_usage',
            type: 'text',
            valueSources: ['value']
        },
        date_fichier: {
            label: 'date_fichier',
            type: 'date',
            valueSources: ['value']
        }
    }
};
export default fichier;
