const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/appointments', appointmentController.create);
router.get('/appointments', appointmentController.findAll);
router.put('/appointments/:id', appointmentController.update);
router.delete('/appointments/:id', appointmentController.delete);

module.exports = router;