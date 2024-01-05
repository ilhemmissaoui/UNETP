const cotisation_parametre = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'cotisation_parametre',
    subfields: {
        id_cotisation_parametre: {
            label: 'id_cotisation_parametre',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        annee: {
            label: 'annee',
            type: 'text',
            valueSources: ['value']
        },
        date_appel: {
            label: 'date_appel',
            type: 'date',
            valueSources: ['value']
        },

        last_date_appel: {
            label: 'last_date_appel',
            type: 'date',
            valueSources: ['value']
        },

        last_log_appel: {
            label: 'last_log_appel',
            type: 'text',
            valueSources: ['value']
        },
        sc_college: {
            label: 'sc_college',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        sc_lp: {
            label: 'sc_lp',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        sc_lt: {
            label: 'sc_lt',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        sc_bts: {
            label: 'sc_bts',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        sc_sup: {
            label: 'sc_sup',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        sc_autre: {
            label: 'sc_autre',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        hc_lp: {
            label: 'hc_lp',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        hc_lt: {
            label: 'hc_lt',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        hc_bts: {
            label: 'hc_bts',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        hc_sup: {
            label: 'hc_sup',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        hc_autre: {
            label: 'hc_autre',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        cfa_ufa: {
            label: 'cfa_ufa',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        cfp_cfc: {
            label: 'cfp_cfc',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        fonctionnement_college_employeur: {
            label: 'fonctionnement_college_employeur',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        chef_etablissement: {
            label: 'chef_etablissement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        autre_dirigeant: {
            label: 'autre_dirigeant',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        ancien: {
            label: 'ancien',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        part_fixe_034: {
            label: 'part_fixe_034',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        part_fixe_12: {
            label: 'part_fixe_12',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default cotisation_parametre;
