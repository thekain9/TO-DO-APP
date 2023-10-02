// Importing the Mongoose library for database interaction.
const mongoose = require('mongoose');

// Importing the bcrypt library for password hashing and verification.
const bcrypt = require('bcrypt');

// Defining a schema for the User model. It has username and password fields.
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username must be a string, is required, and must be unique.
    password: { type: String, required: true }                 // Password must be a string and is required.
});

// Middleware to hash the password before saving a user.
// This ensures passwords are not saved in plaintext.
userSchema.pre('save', async function(next) {
    // If password hasn't been modified, proceed without hashing.
    if (!this.isModified('password')) return next();
    
    // Hash the password with a salt of 10 rounds.
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare an inputted password with the user's hashed password.
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Exporting the User model which uses the defined schema.
module.exports = mongoose.model('User', userSchema);


