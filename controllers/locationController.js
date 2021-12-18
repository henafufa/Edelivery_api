const mongoose = require('mongoose');

const Location = require('../models/location');

const RETRY_MESSAGE = " Please try again.";

exports.saveLocation = (req, res, next) => {
  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    agent: req.body.agent,
    location: req.body.location
  });

  const query = { agent: req.body.agent }
  const update = {
    $set: {
      agent: req.body.agent,
      location: req.body.location
    }
  };
  Location.updateLocation(query, update, (err, location) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to set location.' + err
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Location set successfully.',
        location
      });
    }
  });
}

exports.getLocationById = (req, res, next) => {
  const id = req.params.agentId;
  Location.getLocationById(id, (err, Location) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Can not get the order." + RETRY_MESSAGE
      });
    }
    return res.status(200).json({
      success: true,
      message: "Location accessed",
      Location
    });
  });
}

exports.getLocation = (req, res, next) => {
  Location.getLocation((err, location) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Can not get the order." + RETRY_MESSAGE
      });
    }
    return res.status(200).json({
      success: true,
      message: "Location accessed",
      location
    });
  })
}

exports.deleteLocations = (req, res, next) => {
  Location
    .remove()
    .exec()
    .then(
      res.status(200).json({
        message: "All locations are deleted",
      }))
}