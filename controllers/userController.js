const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await User.findOne({ email });

    if(userExists){
      res.status(400).send({ message : "User Already Exists"});
    }

    // Create a new user object
    const user = new User({
      name,
      email,
      password: encryptedPassword
    });

    // Save the user to the database
    user
      .save()
      .then(() => {
        res.status(201).send('User Registered Successfully');
      })
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Create session data
    //req.session.userId = user.id;

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
