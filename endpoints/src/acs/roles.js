import { establishmentOwnership, subscriptionFeesOwnership, userOwnership } from './helpers';

export const ADMIN = {
    name: 'ADMIN',
    roleId: 100,
    permissions: [
        {
            subject: 'establishment',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true,
            export: true
        },
        {
            subject: 'user',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true,
            export: true
        },
        {
            subject: 'delegation',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'coordinate',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'network',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'subscriptionFee',
            list: true,
            pay: false,
            write: true,
            view: true
        },
        {
            subject: 'subscriptionFees.byEstablishment',
            list: true
        },
        {
            subject: 'subscriptionFees.byEstablishmentFiltrable',
            list: true
        },
        {
            subject: 'subscriptionFees.annualForcast',
            list: true
        },
        {
            subject: 'subscriptionFees.annualCollected',
            list: true
        },
        {
            subject: 'subscriptionFees.byUserFiltrable',
            list: true
        },
        {
            subject: 'subscriptionFees.relaunchInitialFees',
            list: true,
            view: true,
            write: true,
            export: true,
            email: true
        },
        {
            subject: 'unetp',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'unetp.ca',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'unetp.office',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'unetp.unetp',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'advancedSearch',
            list: true
        },
        {
            subject: 'advancedSearch.predefined',
            list: true
        },
        {
            subject: 'advancedSearch.personalized',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'access',
            list: true
        },
        {
            subject: 'access.roles',
            list: true
        },
        {
            subject: 'access.users',
            list: true
        },
        {
            subject: 'archives',
            list: true,
            delete: true
        },
        {
            subject: 'archives.users',
            list: true,
            delete: true
        },
        {
            subject: 'archives.organization',
            list: true,
            delete: true
        },
        {
            subject: 'configuration',
            list: true
        },
        {
            subject: 'function-label',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'civility',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'academy',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'establishment-label',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.type',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.function',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.domain',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.group',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.sub-group',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.grade',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'diploma.specialty',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'pension',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'guardianship',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'history-type',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        },
        {
            subject: 'subscription-param',
            list: true,
            view: true,
            write: false,
            create: true,
            delete: false
        },
        {
            subject: 'request',
            list: true,
            view: true,
            write: true,
            create: true,
            delete: true
        }
    ]
};
export const READER = {
    name: 'READER',
    roleId: 20,
    permissions: [
        {
            subject: 'establishment',
            list: true
        },
        {
            subject: 'user',
            list: true
        },
        {
            subject: 'delegation',
            list: true
        },
        {
            subject: 'coordinate',
            list: true
        },
        {
            subject: 'network',
            list: true
        },
        {
            subject: 'diploma',
            list: true
        },
        {
            subject: 'subscriptionFee',
            list: true
        },
        {
            subject: 'subscriptionFees.byEstablishment',
            list: true
        },
        {
            subject: 'subscriptionFees.byEstablishmentFiltrable',
            list: true
        },
        {
            subject: 'subscriptionFees.annualForcast',
            list: true
        },
        {
            subject: 'subscriptionFees.annualCollected',
            list: true
        },
        {
            subject: 'subscriptionFees.byUserFiltrable',
            list: true
        },
        {
            subject: 'subscriptionFees.relaunchInitialFees',
            list: true,
            view: true,
            write: false,
            create: false,
            delete: false,
            export: false,
            email: false
        },
        {
            subject: 'unetp',
            list: true,
            view: true,
            write: false,
            create: false,
            delete: false,
            export: false,
            email: false,
            save: false
        },
        {
            subject: 'unetp.ca',
            list: true,
            view: true
        },
        {
            subject: 'unetp.office',
            list: true
        },
        {
            subject: 'unetp.unetp',
            list: true
        },
        {
            subject: 'advancedSearch',
            list: true
        },
        {
            subject: 'advancedSearch.predefined',
            list: true
        },
        {
            subject: 'advancedSearch.personalized',
            list: true,
            view: true,
            write: false,
            create: false,
            delete: false
        },
        {
            subject: 'access',
            list: true,
            view: true
        },
        {
            subject: 'access.roles',
            list: true,
            view: true
        },
        {
            subject: 'access.users',
            list: true,
            view: true
        },
        {
            subject: 'archives',
            list: true,
            view: true,
            restore: false,
            delete: false
        },
        {
            subject: 'archives.users',
            list: true,
            view: true,
            delete: false
        },
        {
            subject: 'archives.organization',
            list: true,
            view: true,
            delete: false
        },
        {
            subject: 'configuration',
            list: true
        },
        {
            subject: 'function-label',
            list: true
        },
        {
            subject: 'civility',
            list: true
        },
        {
            subject: 'academy',
            list: true
        },
        {
            subject: 'establishment-label',
            list: true
        },
        {
            subject: 'diploma.type',
            list: true
        },
        {
            subject: 'diploma.function',
            list: true
        },
        {
            subject: 'diploma.domain',
            list: true
        },
        {
            subject: 'diploma.group',
            list: true
        },
        {
            subject: 'diploma.sub-group',
            list: true
        },
        {
            subject: 'diploma.grade',
            list: true
        },
        {
            subject: 'diploma.specialty',
            list: true
        },
        {
            subject: 'pension',
            list: true
        },
        {
            subject: 'guardianship',
            list: true
        },
        {
            subject: 'history-type',
            list: true
        },
        {
            subject: 'subscription-param',
            list: true
        },
        {
            subject: 'request',
            list: true
        }
    ]
};

export const MEMBER = {
    name: 'MEMBER',
    roleId: 0,
    permissions: [
        {
            subject: 'establishment',
            list: true,
            view: true,
            write: true,
            conditions: {
                write: establishmentOwnership
            }
        },
        {
            subject: 'civility',
            list: true
        },
        {
            subject: 'subscriptionFee',
            pay: true,
            view: true,
            write: true,
            conditions: {
                pay: subscriptionFeesOwnership,
                view: subscriptionFeesOwnership,
                write: subscriptionFeesOwnership
            }
        },
        {
            subject: 'establishment-label',
            view: true,
            list: true
        },
        {
            subject: 'pension',
            view: true,
            list: true
        },
        {
            subject: 'academy',
            list: true,
            view: true
        },
        {
            subject: 'delegation',
            list: true,
            view: true
        },
        {
            subject: 'guardianship',
            list: true,
            view: true
        },
        {
            subject: 'function-label',
            list: true,
            view: true
        },
        {
            subject: 'subscription-param',
            list: true,
            view: true
        },
        {
            subject: 'diploma',
            list: true,
            view: true
        },
        {
            subject: 'history-type',
            list: true,
            view: true
        },
        {
            subject: 'diploma.type',
            list: true,
            view: true
        },
        {
            subject: 'diploma.function',
            list: true,
            view: true
        },
        {
            subject: 'diploma.domain',
            list: true,
            view: true
        },
        {
            subject: 'diploma.group',
            list: true,
            view: true
        },
        {
            subject: 'diploma.sub-group',
            list: true,
            view: true
        },
        {
            subject: 'diploma.grade',
            list: true,
            view: true
        },
        {
            subject: 'diploma.specialty',
            list: true,
            view: true
        },
        {
            subject: 'user',
            list: true,
            view: true,
            write: true,
            delete: true,
            create: true,
            conditions: {
                write: userOwnership,
                delete: userOwnership
            }
        }
    ]
};
export const MANAGER = {
    name: 'MANAGER',
    roleId: 300,
    permissions: [
        {
            subject: 'establishment',
            view: true,
            list: true,
            write: false,
            conditions: {
                view: establishmentOwnership,
                list: establishmentOwnership
            }
        },
        {
            subject: 'subscriptionFee',
            pay: true,
            view: true,
            conditions: {
                pay: subscriptionFeesOwnership,
                view: subscriptionFeesOwnership
            }
        },
        {
            subject: 'organization',
            list: false,
            view: false,
            write: false,
            create: false,
            delete: false,
            suspend: false,
            resume: false
        }
    ]
};

export default { ADMIN, READER, MEMBER, MANAGER };
