import express from 'express';

import domainsRoute from './domains.route';
import functionsRoute from './functions.route';
import gradesRoute from './grades.route';
import groupsRoute from './groups.route';
import specialtiesRoute from './specialties.route';
import subGroupsRoute from './subGroups.route';
import typesRoute from './types.route';

const route = express.Router();

const routes = [
    {
        path: '/types',
        route: typesRoute
    },
    {
        path: '/functions',
        route: functionsRoute
    },
    {
        path: '/domains',
        route: domainsRoute
    },
    {
        path: '/groups',
        route: groupsRoute
    },
    {
        path: '/grades',
        route: gradesRoute
    },
    {
        path: '/specialties',
        route: specialtiesRoute
    },
    {
        path: '/sub-groups',
        route: subGroupsRoute
    }
];
routes.forEach((item) => {
    route.use(item.path, item.route);
});

export default route;
