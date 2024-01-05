const resources = [
    {
        resource: 'establishment',
        actions: ['list', 'view', 'write', 'create', 'delete']
    },
    {
        resource: 'user',
        actions: ['list', 'view', 'write', 'create', 'delete', 'export']
    },
    {
        resource: 'delegation',
        actions: ['list', 'view', 'write', 'create', 'delete']
    },
    {
        resource: 'network',
        actions: ['list', 'view', 'write', 'create', 'delete']
    },
    {
        resource: 'diploma',
        actions: ['list', 'view', 'write', 'create', 'delete']
    },
    {
        resouce: 'subscriptionFees.byEstablishment',
        actions: ['list']
    },
    {
        resouce: 'subscriptionFees.byEstablishmentFiltrable',
        actions: ['list']
    },
    {
        resouce: 'subscriptionFees.annualForcast',
        actions: ['list']
    },
    {
        resouce: 'subscriptionFees.annualCollected',
        actions: ['list']
    }
];
export default resources;
