const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { User } = require('../models/users');

// Render the login page
exports.renderLogin = (req, res) => {
  res.render('login');
};

// Handle user login
exports.checkLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('login', { errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).render('error', { errorMessage: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).render('error', { errorMessage: 'Incorrect password' });
      }

      // Set session data or redirect to a dashboard, etc.
      req.session.userId = user._id;
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
  },
];

// Handle user registration
exports.saveCredentials = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};
