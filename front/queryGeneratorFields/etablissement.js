const etablissement = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'etablissement',
    subfields: {
        id_etablissement: {
            label: 'id_etablissement',
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
        id_delegation: {
            label: 'id_delegation',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_etablissement_pere: {
            label: 'id_etablissement_pere',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_academie: {
            label: 'id_academie',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_departement: {
            label: 'id_departement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_delegue: {
            label: 'id_delegue',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        cle_etablissement: {
            label: 'cle_etablissement',
            type: 'text',
            valueSources: ['value']
        },
        numero_etablissement: {
            label: 'numero_etablissement',
            type: 'text',
            valueSources: ['value']
        },
        relation_unetp: {
            label: 'relation_unetp',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'membre adhérent', title: 'membre adhérent' },
                    { value: 'membre associé', title: 'membre associé' },
                    { value: 'non membre', title: 'non membre' }
                ]
            }
        },

        num_acad_lp: {
            label: 'num_acad_lp',
            type: 'text',
            valueSources: ['value']
        },
        num_acad_lt: {
            label: 'num_acad_lt',
            type: 'text',
            valueSources: ['value']
        },
        num_acad_cfa: {
            label: 'num_acad_cfa',
            type: 'text',
            valueSources: ['value']
        },
        num_existence_cfp: {
            label: 'num_existence_cfp',
            type: 'text',
            valueSources: ['value']
        },
        mixte: {
            label: 'mixte',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'mixte', title: 'mixte' },
                    { value: 'fille', title: 'fille' },
                    { value: 'garçon', title: 'garçon' },
                    { value: 'nc', title: 'nc' }
                ]
            }
        },
        commentaires: {
            label: 'commentaires',
            type: 'text',
            valueSources: ['value']
        },
        commentaires_formation: {
            label: 'commentaires_formation',
            type: 'text',
            valueSources: ['value']
        },
        commentaires_prives: {
            label: 'commentaires_prives',
            type: 'text',
            valueSources: ['value']
        },
        date_premiere_adhesion: {
            label: 'date_premiere_adhesion',
            type: 'date',
            valueSources: ['value']
        },

        ogec_name: {
            label: 'ogec_name',
            type: 'text',
            valueSources: ['value']
        },
        ogec_address: {
            label: 'ogec_address',
            type: 'text',
            valueSources: ['value']
        },
        ogec_phone_number: {
            label: 'ogec_phone_number',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default etablissement;
