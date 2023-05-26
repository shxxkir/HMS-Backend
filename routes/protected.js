const express = require('express');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'Access granted' });
});

module.exports = router;
