const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/rooms',roomController.createRoom);
router.get('/rooms',roomController.findAllRooms);
router.get('/rooms/:id',roomController.findOneRoom);
router.put('/rooms/:id',roomController.updateRoom);
router.delete('/rooms/:id',roomController.deleteRoom);

module.exports = router;

