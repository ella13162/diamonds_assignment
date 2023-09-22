const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/users');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.checkLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    // ... (Login logic)
  },
];

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
