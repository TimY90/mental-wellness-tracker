const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

console.log('✅ auth.js loaded');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('🛠 Registering user:', name, email, password);


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    console.log("Starting hash...");
    const hashedPassword = await bcrypt.hash(password, 8); // slightly faster
    console.log("Hash done");
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    res.status(500).json({ message: 'Registration failed. Check server logs.' });

  }
  
  
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
