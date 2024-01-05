import express from 'express';

import organizationsRoute from './organizations.route';
import usersRoute from './users.route';

const route = express.Router();

const routes = [
    {
        path: '/users',
        route: usersRoute
    },
    {
        path: '/organizations',
        route: organizationsRoute
    }
];
routes.forEach((item) => {
    route.use(item.path, item.route);
});

export default route;
