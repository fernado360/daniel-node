const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const rolesRoute = require('./roles.route');
const loanRoute = require('./loan.route');
const notificationRoute = require('./notification.route');
const docsRoute = require('./docs.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: rolesRoute,
  },
  {
    path: '/loan',
    route: loanRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
// }

module.exports = router;
