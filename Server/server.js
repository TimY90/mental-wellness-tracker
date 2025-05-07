const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow localhost and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://mental-wellness-tracker-a1gt.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// ✅ Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, 'build')));

// ✅ Serve index.html for frontend routes
app.get(['/', '/login', '/register', '/log-mood', '/history', '/chart'], (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ✅ Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB connection error:', err));
