const express = require('express');
const router = express.Router();
const MainController = require('../controllers/mainController');

// Instantiate a new instance of the MainController
const mainController = new MainController();

router.get('/', mainController.getData);

module.exports = router;