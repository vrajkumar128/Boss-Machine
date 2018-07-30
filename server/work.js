const express = require('express');
const {
  createWork,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Create workRouter
const workRouter = express.Router();

// Handle :workId router parameter
workRouter.param('workId', (req, res, next, id) => {
  const assignment = getFromDatabaseById('work', id);

  if (assignment && assignment !== -1) {
    req.assignment = assignment;
    next();
  } else {
    res.status(404).send();
  }
});

// Get a minion's work assignments
workRouter.get('/', (req, res, next) => {
  const allWork = getAllFromDatabase('work');
  const minionWork = allWork.filter(assignment => assignment.minionId === req.minion.id);
  res.send(minionWork);
});

// Update a work assignment
workRouter.put('/:workId', (req, res, next) => {
  const minionHasAssignment = (req.assignment.minionId === req.minion.id);

  if (minionHasAssignment) {
    const updatedAssignment = updateInstanceInDatabase('work', req.body);
    updatedAssignment ? res.send(updatedAssignment) : res.status(400).send();
  } else {
    res.status(400).send();
  }
});

// Create a work assignment
workRouter.post('/', (req, res, next) => {
  const newAssignment = createWork(req.minion.id);
  addToDatabase('work', newAssignment);
  res.status(201).send(newAssignment);
});

// Delete a work assignment
workRouter.delete('/:workId', (req, res, next) => {
  deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send();
});

module.exports = workRouter;
