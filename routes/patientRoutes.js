const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// CREATE a new patient
router.post('/patients', patientController.create);

// GET all patients 
router.get('/patients', patientController.findAll);

// GET a specific patient by ID
router.get('/patients/:id', patientController.findOne);

// UPDATE an existing patient
router.put('/patients/:id', patientController.update);

// DELETE an existing patient
router.delete('/patients/:id', patientController.delete);

module.exports = router;
