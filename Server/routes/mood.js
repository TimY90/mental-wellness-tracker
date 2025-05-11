const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MoodEntry = require('../models/MoodEntry');

// Middleware: Verifies the presence and validity of a JWT token in the request headers
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Token missing' });

  // Extracts the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1]; 

  try {
    // Decodes the token and attaches the user information to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Route: POST /api/mood/add
// Creates a new mood entry for the authenticated user
router.post('/add', verifyToken, async (req, res) => {
  const { mood, stressLevel, note } = req.body;

  try {
    const newEntry = new MoodEntry({
      userId: req.user.id,
      mood,
      stressLevel,
      note
    });

    await newEntry.save();
    res.status(201).json({ message: 'Mood entry saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving mood entry' });
  }
});

// Route: GET /api/mood/my-moods
// Returns the authenticated user's mood history, sorted with the most recent entries first
router.get('/my-moods', verifyToken, async (req, res) => {
  try {
    const moods = await MoodEntry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching moods' });
  }
});

module.exports = router;