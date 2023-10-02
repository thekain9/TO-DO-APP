// Importing necessary libraries and modules.
var express = require('express');                             // For building the routing framework.
var router = express.Router();                                // For creating route handlers.
const User = require('../models/User');                       // The User model to interact with the database.
const bcrypt = require('bcrypt');                             // For password hashing and comparison.
const jwt = require('jsonwebtoken');                          // For creating and verifying JSON web tokens.

// POST request for user registration.
router.post('/register', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    console.log("Request body:", req.body);
    // Check if user already exists in the database.
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already taken' });
    }

    const user = new User({ username, password });            // Creating a new user instance.
    await user.save();                                        // Saving the new user to the database.
    res.status(201).send({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
});

// POST request for user login.
router.post('/login', async (req, res) => {
  try {
      const username = req.body.username;
      const password = req.body.password;
      // Checking if the username exists in the database.
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).send({ message: 'Invalid username or password' });
      }

      // Comparing the provided password with the hashed password in the database.
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).send({ message: 'Invalid username or password' });
      }

      // Generating a JWT for the authenticated user.
      const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

      // Sending the token back to the client.
      res.status(200).send({ message: 'Login successful', token: token, userId: user._id });
  } catch (error) {
      // Handling errors during login.
      res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});

// Exporting the router to be used in other parts of the application.
module.exports = router;

