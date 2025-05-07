const mongoose = require('mongoose');

// Defines the schema for storing individual mood entries in the database
const moodEntrySchema = new mongoose.Schema(
  {
    // Reference to the user who created the mood entry
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // The mood description provided by the user
    mood: {
      type: String,
      required: true
    },

    // A numeric stress level between 1 and 10
    stressLevel: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },

    // Optional note for additional context
    note: {
      type: String
    },

    // Date of the entry, defaults to the current date
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    // Adds createdAt and updatedAt timestamps automatically
    timestamps: true
  }
);

// Exports the model so it can be used throughout the application
module.exports = mongoose.model('MoodEntry', moodEntrySchema);
