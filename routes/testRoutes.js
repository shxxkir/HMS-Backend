const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/test', testController.create);
router.get('/test', testController.findAll);
router.put('/test/:id', testController.update);
router.delete('/test/:id', testController.delete);

module.exports = router;
