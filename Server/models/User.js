const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // ✅ trims whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // ✅ makes it case-insensitive
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // ✅ adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('User', userSchema);
