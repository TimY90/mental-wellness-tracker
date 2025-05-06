const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MoodEntry = require('../models/MoodEntry');

// Middleware to check token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// POST: Create mood entry
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

// GET: Get user’s mood history
router.get('/my-moods', verifyToken, async (req, res) => {
  try {
    const moods = await MoodEntry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching moods' });
  }
});

module.exports = router;
