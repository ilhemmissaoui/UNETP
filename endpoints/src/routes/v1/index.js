import express from 'express';

import config from '../../config/secrets';
import academiesRoute from './academies.route';
import authRoute from './auth.route';
import civilitiesRoute from './civilities.route';
import CoordinateRoute from './coordinates.route';
import countriesRoute from './countries.route';
import delegationsRoute from './delegations.route';
import departmentsRoute from './departments.route';
import diplomaCharacteristicsRoute from './diploma-characteristics.route';
import diplomasRoute from './diplomas.route';
import boardDirectors from './directorsBoard.route';
import docsRoute from './docs.route';
import swaggerRoute from './docs.route';
import establishmentLabelsRoute from './establishmentLabels.route';
import establishmentsRoute from './establishments.route';
import functionLabelsRoute from './functionLabels.route';
import guardianshipsRoute from './guardianships.route';
import historyRoute from './history.route';
import historyTypesRoute from './historyTypes.route';
import metaRoute from './meta.route';
import networksRoute from './networks.route';
import officeBoardDirectors from './officeBoardDirectors.route';
import organizationsRoute from './organizations.route';
import organizationTypesRoute from './organizationTypes.route';
import pensionsRoute from './pensions.route';
import predefinedSearch from './predefinedSearch.route';
import RequestChangeRoute from './request.route';
import RequestRoute from './requestRa.route';
import restoreRoute from './restore.route/index';
import subscirptionFeesParam from './subscirptionFeesParams.route';
import subscriptionFeesRoute from './subscriptionFees.route';
import swRoute from './sw.route';
import trashRoute from './trash.route/index';
import organizationTrash from './trash.route/organizations.route';
import unetp from './unetp.route';
import UnionSubscriptionFees from './UnionSubscriptionFees.route';
import usersRoute from './users.route';
const router = express.Router();

const defaultRoutes = [
    { path: '/sw', route: swRoute },
    { path: '/office-board-directors', route: officeBoardDirectors },
    { path: '/directors-board', route: boardDirectors },
    { path: '/unetp', route: unetp },
    { path: '/function-labels', route: functionLabelsRoute },
    { path: '/organization-types', route: organizationTypesRoute },
    { path: '/civilities', route: civilitiesRoute },
    { path: '/academies', route: academiesRoute },
    { path: '/establishment-labels', route: establishmentLabelsRoute },
    { path: '/diploma-characteristics', route: diplomaCharacteristicsRoute },
    { path: '/trash', route: trashRoute },
    { path: '/restore', route: restoreRoute },
    { path: '/diplomas', route: diplomasRoute },
    { path: '/pensions', route: pensionsRoute },
    { path: '/guardianships', route: guardianshipsRoute },
    { path: '/history-types', route: historyTypesRoute },
    { path: '/countries', route: countriesRoute },
    { path: '/users', route: usersRoute },
    { path: '/auth', route: authRoute },
    { path: '/departments', route: departmentsRoute },
    { path: '/organizations', route: organizationsRoute },
    { path: '/networks', route: networksRoute },
    { path: '/delegations', route: delegationsRoute },
    { path: '/establishments', route: establishmentsRoute },
    { path: '/subscription-fees', route: subscriptionFeesRoute },
    { path: '/subscription-params', route: subscirptionFeesParam },
    { path: '/subscription-unions', route: UnionSubscriptionFees },
    { path: '/organizations-trash', route: organizationTrash },
    { path: '/search', route: predefinedSearch },
    { path: '/meta', route: metaRoute },
    { path: '/requests', route: RequestRoute },
    { path: '/request-change', route: RequestChangeRoute },
    { path: '/coordinates', route: CoordinateRoute },
    { path: '/history', route: historyRoute },
    { path: '/swagger', route: swaggerRoute }
]; // const defaultRoutes = [
//     {
//         path: '/auth',
//         route: authRoute
//     },
//     {
//         path: '/dashboard',
//         route: dashboardRoute
//     },
//     {
//         path: '/users',
//         route: usersRoute
//     },
//     {
//         path: '/users',
//         route: profileRoute
//     },
//     {
//         path: '/claims',
//         route: claimsRoute
//     },
//     {
//         path: '/claim-categories',
//         route: claimCategoriesRoute
//     },
//     { path: '/advances', route: advancesRoute },
//     {
//         path: '/mobile',
//         route: mobileRoute
//     },
//     {
//         path: '/partners',
//         route: partnerRoute
//     },
//     {
//         path: '/bundles',
//         route: bundlesRoute
//     },
//     {
//         path: '/balances',
//         route: balancesRoute
//     },
//     {
//         path: '/settings',
//         route: settingsRoute
//     },
//     {
//         path: '/auth/otp',
//         route: optRoute
//     },
//     {
//         path: '/positions',
//         route: positionsRoute
//     },
//     {
//         path: '/departments',
//         route: departmentsRoute
//     },
//     {
//         path: '/notifications',
//         route: notificationsRoute
//     },
//     {
//         path: '/roles',
//         route: rolesRoute
//     },
//     {
//         path: '/organizations',
//         route: organizationsRoute
//     },
//     {
//         path: '/employees',
//         route: employeesRoute
//     },
//     {
//         path: '/countries',
//         route: countriesRoute
//     },
//     {
//         path: '/invoices',
//         route: invoicesRoute
//     },
//     {
//         path: '/organization-users',
//         route: organizationUsersRoute
//     },
//     {
//         path: '/plans',
//         route: plansRoute
//     },
//     {
//         path: '/payroll',
//         route: payrollRoute
//     },
//     {
//         path: '/packages',
//         route: packagesRoute
//     }
// ];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
