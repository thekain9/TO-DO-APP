// Importing the jsonwebtoken library to handle JSON web tokens.
const jwt = require('jsonwebtoken');

// Importing the User model for database operations.
const User = require('../models/User');

// The exported function is an Express middleware that ensures the request is authenticated.
module.exports = async (req, res, next) => {
    // Extracting the token from the request's Authorization header and removing the 'Bearer ' prefix.
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        // Using jsonwebtoken to decode and verify the token against a secret key.
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');

        // Finding the user in the database that corresponds to the userId in the decoded token.
        const user = await User.findById(decoded.userId); //*I took the name "userId" from the name displayed in Postman because it was created by MongoDB automatically, and i assigned the value of that id to the name "userId" on the users.js route.
        
        // If there's no such user in the database, it sends a 403 status code with an error message.
        if (!user) {
            return res.status(403).send({ error: 'Please authenticate' });
        }

        // Additional check: if the user's email doesn't end with '@gmail.com', it's considered forbidden.
        if (!user.username.endsWith('@gmail.com')) {
            return res.status(403).send({ error: 'Forbidden' });
        }

        // Assigning the authenticated user to the request object for use in later middleware or routes.
        req.user = user;

        // Proceeding to the next middleware or route.
        next();
    } catch (e) {
        // If there's any error (e.g., token is invalid), it sends a 401 status code indicating authentication is required.
        res.status(401).send({ error: 'Please authenticate' });
    }
};

