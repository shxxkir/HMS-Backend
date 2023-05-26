const User = require('../models/user');

const requireAuth = async (req, res, next) => {
  try {
    // Check session data
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user data to request object
    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = requireAuth;
