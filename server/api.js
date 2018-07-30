const express = require('express');

// Create apiRouter
const apiRouter = express.Router();

// Import and mount minionsRouter
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

// Import and mount ideasRouter
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

// Import and mount meetingsRouter
const meetingsRouter = require('./meetings');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
