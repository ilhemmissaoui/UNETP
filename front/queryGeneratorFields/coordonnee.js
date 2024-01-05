const coordonnee = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'coordonnee',
    subfields: {
        id_coordonnee: {
            label: 'id_coordonnee',
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
        id_fonction: {
            label: 'id_fonction',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_pays: {
            label: 'id_pays',
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
        telephone: {
            label: 'telephone',
            type: 'text',
            valueSources: ['value']
        },
        fax: {
            label: 'fax',
            type: 'text',
            valueSources: ['value']
        },
        mobile: {
            label: 'mobile',
            type: 'text',
            valueSources: ['value']
        },
        email: {
            label: 'email',
            type: 'text',
            valueSources: ['value']
        },
        site_web: {
            label: 'site_web',
            type: 'text',
            valueSources: ['value']
        },
        coordonnee: {
            label: 'coordonnee',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'particulier', title: 'particulier' },
                    { value: 'professionnel', title: 'professionnel' }
                ]
            }
        },

        destinataire: {
            label: 'destinataire',
            type: 'text',
            valueSources: ['value']
        },
        destinataire_complement: {
            label: 'destinataire_complement',
            type: 'text',
            valueSources: ['value']
        },
        adresse_ligne1: {
            label: 'adresse_ligne1',
            type: 'text',
            valueSources: ['value']
        },
        numero_voie: {
            label: 'numero_voie',
            type: 'text',
            valueSources: ['value']
        },
        libelle_voie: {
            label: 'libelle_voie',
            type: 'text',
            valueSources: ['value']
        },
        adresse_ligne3: {
            label: 'adresse_ligne3',
            type: 'text',
            valueSources: ['value']
        },
        code_postal: {
            label: 'code_postal',
            type: 'text',
            valueSources: ['value']
        },
        ville: {
            label: 'ville',
            type: 'text',
            valueSources: ['value']
        },
        cedex: {
            label: 'cedex',
            type: 'text',
            valueSources: ['value']
        },
        defaut: {
            label: 'defaut',
            type: 'boolean',
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

        createur: {
            label: 'createur',
            type: 'text',
            valueSources: ['value']
        },
        modificateur: {
            label: 'modificateur',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default coordonnee;
