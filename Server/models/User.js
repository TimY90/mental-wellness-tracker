const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true // ✅ trims whitespace
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // ✅ makes it case-insensitive
    trim: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
}, {
  timestamps: true // ✅ adds createdAt and updatedAt automatically
});

// Optional debug middleware (for dev)
userSchema.post('save', function (doc, next) {
  console.log('✅ New user saved:', doc.email);
  next();
});

module.exports = mongoose.model('User', userSchema);
