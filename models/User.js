// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails allowed
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // only hash if password is new or changed
  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash the password
  next();
});

// Create and export the model
module.exports = mongoose.model('User', UserSchema);
