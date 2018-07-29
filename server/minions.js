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

// Get all minions
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

// Get a single minion
minionsRouter.get('/:id', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.id);

  if (minion && minion !== -1) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

// Update a minion
minionsRouter.put('/:id', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.id);
  const updatedMinion = updateInstanceInDatabase('minions', req.body);

  if (minion && minion !== -1 && updatedMinion) {
    updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

// Create a minion
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);

  if (newMinion) {
    addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  } else {
    res.status(400).send();
  }
});

// Delete a minion
minionsRouter.delete('/:id', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.id);

  if (minion && minion !== -1) {
    deleteFromDatabasebyId('minions', req.params.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
