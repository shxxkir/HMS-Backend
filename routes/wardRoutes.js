const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');

router.post('/wards', wardController.create);
router.get('/wards', wardController.findAll);
router.put('/wards/:id', wardController.update);
router.delete('/wards/:id', wardController.delete);

module.exports = router;
