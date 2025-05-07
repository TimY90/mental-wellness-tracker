const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Logs when the authentication module is loaded
console.log('auth.js loaded');

// Retrieves the JWT secret key from environment variables or uses a fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Route: POST /register
// Handles user registration by validating uniqueness and hashing the password
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Registering user:', name, email, password);

  try {
    // Check if a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving the user
    console.log("Starting password hash...");
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log("Hash complete");

    // Create and store the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // Log errors and return a server error response
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Registration failed. Check server logs.' });
  }
});

// Route: POST /login
// Authenticates the user by verifying email and password, and returns a JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Attempt to find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare provided password with the hashed one in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Generate a signed JWT token with a 1-day expiration
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send back the token and user information (excluding password)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Exports the router to be used in the main application
module.exports = router;
