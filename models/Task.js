// Importing the Mongoose library for database interaction.
const mongoose = require('mongoose');

// Defining a schema for the Task model. It has a content field and a user reference.
const taskSchema = new mongoose.Schema({
    content: { type: String, required: true },                  // Content of the task must be a string and is required.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to a User ID, linking the task to a specific user.
});

// Exporting the Task model which uses the defined schema.
module.exports = mongoose.model('Task', taskSchema);

