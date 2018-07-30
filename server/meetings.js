const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase
} = require('./db');

// Create meetingsRouter
const meetingsRouter = express.Router();

// Get all meetings
meetingsRouter.get('/', (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

// Get a single meeting
meetingsRouter.get('/:id', (req, res, next) => {
  const meeting = getFromDatabaseById('meetings', req.params.id);

  if (meeting && meeting !== -1) {
    res.send(meeting);
  } else {
    res.status(404).send();
  }
});

// Create a meeting
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting()
  res.status(201).send(newMeeting);
});

// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;
