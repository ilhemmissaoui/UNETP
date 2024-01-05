const navigation = [
    {
        title: 'Accueil',
        icon: 'bi bi-house-door',
        link: '/',
        type: 'link',
        group: 'dashboard'
    },

    // {
    //     type: 'separator'
    // },
    {
        group: 'managment',
        title: "Gestion des structures d'établissement",
        icon: 'bi bi-mortarboard',
        link: '/structures-etablissement',
        type: 'link',
        ability: ['list', 'establishment'],
        children: [
            {
                title: "Creation d'un établissement",
                link: '/structures-etablissement/nouveau',
                type: 'link',
                ability: ['create', 'establishment']
            },
            {
                title: "Modification d'un établissement",
                link: '/structures-etablissement/modifier/[id]',
                type: 'link',
                ability: ['write', 'establishment'],
                children: [
                    {
                        title: "Modification d'une cotisation",
                        link: '/structures-etablissement/modifier/cotisation/[id]',
                        type: 'link',
                        ability: ['write', 'subscriptionFee']
                    }
                ]
            }
        ]
    },

    {
        group: 'managment',
        title: 'Gestion des personnes',
        icon: 'bi bi-person',
        link: '/personnes',
        type: 'link',
        ability: ['list', 'user'],
        children: [
            {
                title: "Creation d'une personne",
                link: '/personnes/nouveau',
                ability: ['create', 'user']
            },
            {
                title: "Modification d'une personne",
                link: '/personnes/modifier/[id]',
                ability: ['write', 'user']
            }
        ]
    },
    {
        group: 'managment',
        title: 'Gestion des délégations régionales',
        icon: 'bi bi-briefcase-fill',
        link: '/delegations-regionales',
        type: 'link',
        ability: ['list', 'delegation'],
        children: [
            {
                title: "Creation d'une délégation",
                link: '/delegations-regionales/nouveau',
                ability: ['create', 'delegation']
            },
            {
                title: "Modification d'une délégation",
                link: '/delegations-regionales/modifier/[id]',
                ability: ['write', 'delegation']
            }
        ]
    },
    {
        group: 'managment',
        title: 'Gestion des réseaux',
        icon: 'bi bi-diagram-3',
        link: '/reseaux',
        type: 'link',
        ability: ['list', 'network'],
        children: [
            {
                title: "Creation d'un réseau",
                link: '/reseaux/nouveau',
                ability: ['create', 'network']
            },
            {
                title: "Modification d'un réseau",
                link: '/reseaux/modifier/[id]',
                ability: ['write', 'network']
            }
        ]
    },

    {
        group: 'managment',
        title: 'Gestion des diplômes',
        icon: 'bi bi-patch-check',
        link: '/diplomes',
        type: 'link',
        ability: ['list', 'diploma']
    },

    {
        group: 'managment',
        title: 'États des cotisations',
        icon: 'bi bi-graph-up',
        link: '/cotisations',
        type: 'accordion',
        ability: ['list', 'subscriptionFee'],
        children: [
            {
                title: "Cotisations annuelles par structure d'établissement",
                icon: 'bi bi-dot',
                link: '/cotisations/cotisations-annuelles',
                ability: ['list', 'subscriptionFees.byEstablishment'],
                type: 'link'
            },
            {
                title: 'Recherche des cotisations établissement',
                icon: 'bi bi-dot',
                link: '/cotisations/recherche-cotisation-etablissement',
                ability: ['list', 'subscriptionFees.byEstablishmentFiltrable'],
                type: 'link',
                children: [
                    {
                        title: 'Recherche des cotisations établissement',
                        link: '/cotisations/recherche-cotisation-etablissement/details',
                        ability: ['list', 'subscriptionFees.byEstablishmentFiltrable']
                    }
                ]
            },
            {
                title: 'Cotisations annuelles(prévisionnel)',
                icon: 'bi bi-dot',
                link: '/cotisations/cotisations-previsionnel',
                ability: ['list', 'subscriptionFees.annualForcast'],
                type: 'link'
            },
            {
                title: 'Cotisations annuelles(encaissées)',
                icon: 'bi bi-dot',
                link: '/cotisations/cotisations-encaissees',
                ability: ['list', 'subscriptionFees.annualCollected'],
                type: 'link'
            },
            {
                title: 'Relances cotisations initiales',
                icon: 'bi bi-dot',
                link: '/cotisations/relances-initiales',
                ability: ['list', 'subscriptionFees.relaunchInitialFees'],
                type: 'link'
            }
        ]
    },

    // {
    //     type: 'separator'
    // },

    {
        group: 'administration',
        title: 'UNETP',
        icon: 'bi bi-flag',
        link: '/unetp',
        type: 'accordion',
        ability: ['list', 'unetp'],

        children: [
            {
                title: 'CA',
                icon: 'bi bi-dot',
                link: '/unetp/ca',
                ability: ['list', 'unetp.ca'],
                type: 'link'
            },
            {
                title: 'Bureau',
                icon: 'bi bi-dot',
                link: '/unetp/bureau',
                ability: ['list', 'unetp.office'],
                type: 'link'
            },
            {
                title: 'UNETP',
                icon: 'bi bi-dot',
                link: '/unetp/unetp',
                ability: ['list', 'unetp.unetp'],
                type: 'link'
            }
        ]
    },
    {
        group: 'administration',
        title: 'Recherche avancée',
        icon: 'bi bi-search',
        link: '/recherche-avancee',
        ability: ['list', 'advancedSearch'],
        type: 'accordion',
        children: [
            {
                title: 'Recherches prédéfinies',
                icon: 'bi bi-dot',
                link: '/recherche-avancee/predefinie',
                ability: ['list', 'advancedSearch.predefined'],
                type: 'link'
            },
            {
                title: 'Recherche personnalisée',
                icon: 'bi bi-dot',
                link: '/recherche-avancee/personnalise',
                ability: ['list', 'advancedSearch.personalized']
            }
        ]
    },

    // {
    //     group: 'administration',
    //     title: 'Gestion des accés',
    //     icon: 'bi bi-shield-check',
    //     link: '/acces',
    //     ability: ['list', 'access'],
    //     type: 'accordion',
    //     children: [
    //         {
    //             title: 'Gestion des rôles',
    //             icon: 'bi bi-dot',
    //             link: '/acces/roles',
    //             ability: ['list', 'access.roles'],
    //             type: 'link'
    //         },
    //         {
    //             title: 'Gestion des utilisateurs',
    //             icon: 'bi bi-dot',
    //             link: '/aces/personnes',
    //             ability: ['list', 'access.users'],
    //             type: 'link'
    //         }
    //     ]
    // },
    // {
    //     type: 'separator'
    // },
    {
        group: 'archives',
        title: 'Archives',
        icon: 'bi bi-recycle',
        link: '/archives',
        ability: ['list', 'archives'],
        type: 'link',
        children: [
            {
                title: 'Liste des personnes',
                link: '/archives/users',
                ability: ['list', 'archives.users']
            },
            {
                title: 'Liste des organismes',
                link: '/archives/organizations',
                ability: ['list', 'archives.organization']
            }
        ]
    }
];
export const hiddenRoutes = [
    {
        title: 'Appel général à cotisations',
        link: '/appel-a-cotisation/[establishmentNumber]',
        type: 'link'
    },
    {
        title: 'Gestion des demandes',
        icon: 'bi bi-house-door',
        link: '/demandes/[id]',
        type: 'link'
    },
    {
        title: 'Changement de mot de passe',
        type: 'link',
        link: '/changement-mot-de-passe'
    },

    {
        title: 'Justificatif',
        link: '/justificatif'
    },

    // {
    //     title: "Modification d'une cotisation ",
    //     link: '/structures-etablissement/modifier/cotisation/[id]'
    // },
    {
        title: 'Mes informations personnelles',
        link: '/mes-informations-personnelles'
    },
    {
        title: 'Configuration',
        link: '/configuration/[slug]',
        ability: ['list', 'archives.users'],
        children: [
            {
                title: 'Gestion des fonctions',
                link: '/configuration/gestion-fonctions'
            },
            {
                title: 'Gestion des civilités',
                link: '/configuration/gestion-civilites'
            },
            {
                title: 'Gestion des académies',
                link: '/configuration/gestion-academies'
            },
            {
                title: "Gestion des labels d'établissements",
                link: '/configuration/gestion-labels-etablissements'
            },
            {
                title: 'Gestion des diplômes',
                link: '/configuration/gestion-des-diplomes'
            },
            {
                title: 'Gestion des pensions',
                link: '/configuration/gestion-des-pensions'
            },
            {
                title: 'Gestion des tutelles',
                link: '/configuration/gestion-des-tutelles'
            },
            {
                title: "Gestion des types d'historiques",
                link: '/configuration/gestion-types-historiques'
            },
            {
                title: 'Gestion des années de cotisation',
                link: '/configuration/gestion-annees-cotisation'
            }
        ]
    },
    {
        title: 'États des cotisations',

        children: [
            {
                title: "Cotisations annuelles par structure d'établissement ",
                link: '/cotisations/cotisations-annuelles/[id]'
            },
            {
                title: 'Recherche des cotisations établissement ',
                link: '/cotisations/recherche-cotisation-etablissement/[id]'
            }
        ]
    },

    {
        title: 'Paiement de solde',
        link: '/paiement-de-solde',
        children: [
            {
                title: 'Par carte bancaire',
                link: '/paiement-de-solde/par-carte-bancaire'
            },
            {
                title: 'Par chèque ',
                link: '/paiement-de-solde/par-cheque'
            },
            {
                title: 'Par virement',
                link: '/paiement-de-solde/par-virement'
            }
        ]
    },
    {
        title: 'Recherche avancée',
        link: '/recherche-avancee',
        ability: ['list', 'advancedSearch'],
        children: [
            {
                title: 'Recherches prédéfinies',
                link: '/recherche-avancee/predefinie'
            },
            {
                title: 'Recherche personnalisée',
                link: '/recherche-avancee/personnalise',
                children: [
                    {
                        title: "Création d'une Requête",
                        link: '/recherche-avancee/personnalise/requete/nouveau'
                    },
                    {
                        title: "Modification d'une Requête",
                        link: '/recherche-avancee/personnalise/requete/modifier/[id]'
                    },
                    {
                        title: 'Recherche personnalisée',
                        link: '/recherche-avancee/personnalise/requete/execute/[id]'
                    }
                ]
            }
        ]
    }
];
export default navigation;
