import express from 'express';

import customRoute from './custom.route';
import predefinedRoute from './predefined.route';

const route = express.Router();

const routes = [
    {
        path: '/predefined',
        route: predefinedRoute
    },
    {
        path: '/custom',
        route: customRoute
    }
];

routes.forEach((item) => {
    route.use(item.path, item.route);
});

export default route;
