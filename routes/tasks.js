// Importing necessary libraries and modules.
var express = require('express');                      // For building the routing framework.
var router = express.Router();                         // For creating route handlers.
const Task = require('../models/Task');                // The Task model to interact with the database.
const jwt = require('jsonwebtoken');                   // For creating and verifying JSON web tokens.

// JWT Authentication Middleware
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Format: "Bearer YOUR_JWT"

        jwt.verify(token, 'your_secret_key', (err, user) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid token' });
            }

            req.user = user; //Here, the token is assigned to the user.
            next();
        });
    } else {
        res.status(401).send({ message: 'Token not provided' });
    }
}

// Middleware to validate the task content length
function validateTaskLength(req, res, next) {
    if (req.body.content && req.body.content.length > 140) {
        return res.status(400).send({ message: 'Task content exceeds 140 characters' });
    }
    next();
}

// Middleware to ensure content type is JSON
function ensureJSONContentType(req, res, next) {
    const contentType = req.headers['content-type'];
    if (!contentType || contentType.indexOf('application/json') !== 0) {
        return res.status(400).send({ message: 'Content type must be application/json' });
    }
    next();
}

// POST endpoint to create a new task.
router.post('/', authenticateJWT, validateTaskLength, ensureJSONContentType, async (req, res) => {
    try {
        const task = new Task(req.body);               
        await task.save();                             
        res.status(201).send(task);                    
    } catch (error) {
        res.status(500).send({ message: 'Error creating task', error: error.message });
    }
});

// GET endpoint to fetch all tasks.
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const tasks = await Task.find();               
        res.status(200).send(tasks);                   
    } catch (error) {
        res.status(500).send({ message: 'Error fetching tasks', error: error.message });
    }
});

// PUT endpoint to update a task by its ID.
router.put('/:taskId', authenticateJWT, ensureJSONContentType, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found' });  
        }
        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send({ message: 'Error updating task', error: error.message });
    }
});

// DELETE endpoint to delete a task by its ID.
router.delete('/:taskId', authenticateJWT, async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId); 
        if (!deletedTask) {
            return res.status(404).send({ message: 'Task not found' });      
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting task', error: error.message });
    }
});

// Exporting the router to be used in other parts of the application.
module.exports = router;


