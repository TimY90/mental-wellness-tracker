const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS setup using shared config
const corsOptions = {
  origin: '*', // Allow all origins temporarily for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));          // Main CORS middleware
app.options('*', cors(corsOptions)); // Preflight requests

app.use(express.json());

// ✅ API routes
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// ✅ Serve React build files
app.use(express.static(path.join(__dirname, 'build')));

// ✅ Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB connection error:', err));
