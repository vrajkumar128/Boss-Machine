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

// Handle :meetingId router parameter
meetingsRouter.param('meetingId', (req, res, next, id) => {
  const meeting = getFromDatabaseById('meetings', id);

  if (meeting && meeting !== -1) {
    req.meeting = meeting;
    next();
  } else {
    res.status(404).send();
  }
});

// Get all meetings
meetingsRouter.get('/', (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

// Get a single meeting
meetingsRouter.get('/:meetingId', (req, res, next) => {
  res.send(req.meeting);
});

// Create a meeting
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting);
});

// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;
