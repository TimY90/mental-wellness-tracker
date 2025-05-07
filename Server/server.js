const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration: Allows requests from development and production frontend URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://mental-wellness-tracker-a1gt.onrender.com',
  'https://mental-wellness-tracker-r6kn.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enables handling of preflight OPTIONS requests for all routes
app.options('*', cors());

// Parses incoming JSON requests
app.use(express.json());

// API route handlers
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// Serves static frontend files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Wildcard route: Sends index.html for all non-API routes to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connects to MongoDB using credentials from environment variables and starts the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
