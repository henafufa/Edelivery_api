const express = require("express");
const router = express.Router();

const locationController = require('../controllers/locationController');

router.post('/', locationController.saveLocation);

// router.get('/:agentId', locationController.getLocationById);

router.get('/', locationController.getLocation);

router.delete('/', locationController.deleteLocations);

module.exports = router;
