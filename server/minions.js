const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Create minionsRouter
const minionsRouter = express.Router();

// Handle :minionId router parameter
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);

  if (minion && minion !== -1) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// Import and mount workRouter
const workRouter = require('./work');
minionsRouter.use('/:minionId/work', workRouter);

// Get all minions
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

// Get a single minion
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// Update a minion
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);

  if (updatedMinion) {
    res.send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

// Create a minion
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);

  if (newMinion) {
    res.status(201).send(newMinion);
  } else {
    res.status(400).send();
  }
});

// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.params.minionId);
  res.status(204).send();
});

module.exports = minionsRouter;
