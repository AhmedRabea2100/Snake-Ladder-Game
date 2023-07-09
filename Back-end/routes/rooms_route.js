const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms');

router.get('/data', controller.getData); // Define a route that triggers the getData function

module.exports = router;