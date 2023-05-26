const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// CREATE a new staff
router.post('/staffs', staffController.create);

// GET all staffs 
router.get('/staffs', staffController.findAll);

// UPDATE an existing staff
router.put('/staffs/:id', staffController.update);

// DELETE an existing staff
router.delete('/staffs/:id', staffController.delete);

module.exports = router;
