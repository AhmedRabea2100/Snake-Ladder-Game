const express = require('express');
const router = express.Router();
const controller = require('../controllers/create');

router.post('/create', controller.createGame); 

module.exports = router;