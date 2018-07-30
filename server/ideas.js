const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Create ideasRouter
const ideasRouter = express.Router();

// Handle :ideaId router parameter
ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);

  if (idea && idea !== -1) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// Get all ideas
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

// Get a single idea
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

// Update an idea
ideasRouter.put('/:ideaId', (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);

  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

// Create an idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);

  if (newIdea) {
    res.status(201).send(newIdea);
  } else {
    res.status(400).send();
  }
});

// Delete an idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
  deleteFromDatabasebyId('ideas', req.params.ideaId);
  res.status(204).send();
});

module.exports = ideasRouter;
