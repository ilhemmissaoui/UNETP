const personne = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'personne',
    subfields: {
        id_personne: {
            label: 'id_personne',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_civilite: {
            label: 'id_civilite',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_acces: {
            label: 'id_acces',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_college: {
            label: 'id_college',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_interregion: {
            label: 'id_interregion',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        particule: {
            label: 'particule',
            type: 'text',
            valueSources: ['value']
        },
        nom: {
            label: 'nom',
            type: 'text',
            valueSources: ['value']
        },
        prenom: {
            label: 'prenom',
            type: 'text',
            valueSources: ['value']
        },
        nom_naissance: {
            label: 'nom_naissance',
            type: 'text',
            valueSources: ['value']
        },
        date_naissance: {
            label: 'date_naissance',
            type: 'date',
            valueSources: ['value']
        },

        personne: {
            label: 'personne',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'M', title: 'M' },
                    { value: 'F', title: 'F' },
                    { value: 'NC', title: 'NC' }
                ]
            }
        },

        commentaire: {
            label: 'commentaire',
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
                    { value: 'membre correspondant', title: 'membre correspondant' },
                    { value: 'extérieur', title: 'extérieur' },
                    { value: 'nc', title: 'nc' }
                ]
            }
        },
        num_delegue: {
            label: 'num_delegue',
            type: 'text',
            valueSources: ['value']
        },
        ancien_chef_etab: {
            label: 'ancien_chef_etab',
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
        },
        deleted: {
            label: 'deleted',
            type: 'boolean',
            valueSources: ['value']
        },
        archived: {
            label: 'archived',
            type: 'boolean',
            valueSources: ['value']
        },
        file_name_photo: {
            label: 'file_name_photo',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default personne;
