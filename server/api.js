const express = require('express');
const app = express();

// Create apiRouter
const apiRouter = express.Router();

// Import and mount minionsRouter
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

// Import and mount ideasRouter

// Import and mount meetingsRouter

// Import and mount workRouter

module.exports = apiRouter;
