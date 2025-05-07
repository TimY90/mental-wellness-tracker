const mongoose = require('mongoose');

// Defines the schema for storing user account information
const userSchema = new mongoose.Schema({
  // The user's full name
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true // Removes leading and trailing whitespace
  },

  // The user's email address, must be unique and valid
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Converts to lowercase to ensure case-insensitive matching
    trim: true,
    validate: {
      // Basic regex for validating email format
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },

  // Hashed password for authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
}, {
  // Automatically includes createdAt and updatedAt timestamps
  timestamps: true
});

// Middleware to log when a new user is successfully saved to the database
userSchema.post('save', function (doc, next) {
  console.log('New user saved:', doc.email);
  next();
});

// Exports the model for use in authentication and user-related routes
module.exports = mongoose.model('User', userSchema);
