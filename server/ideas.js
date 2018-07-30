const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Create ideasRouter
const ideasRouter = express.Router();

// Get all ideas
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

// Get a single idea
ideasRouter.get('/:id', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.id);

  if (idea && idea !== -1) {
    res.send(idea);
  } else {
    res.status(404).send();
  }
});

// Update a idea
ideasRouter.put('/:id', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.id);
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);

  if (idea && idea !== -1 && updatedIdea) {
    updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

// Create a idea
ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);

  if (newIdea) {
    addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  } else {
    res.status(400).send();
  }
});

// Delete a idea
ideasRouter.delete('/:id', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.id);

  if (idea && idea !== -1) {
    deleteFromDatabasebyId('ideas', req.params.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
