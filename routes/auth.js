const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Import the auth middleware

// @route   POST /api/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create new user instance
    const newUser = new User({ name, email, password });

    // 3. Save user to DB (pre-save hook will hash password)
    await newUser.save();

    // 4. Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/login
// @desc    Authenticate user & return JWT
// @access  Public
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // 1. Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // 2. Compare password
      const isMatch = await require('bcryptjs').compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // 3. Create and sign JWT
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // 4. Send token
      res.json({ token });
  
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/protected', auth, (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}! You are authenticated.` });
  });
  

module.exports = router;
