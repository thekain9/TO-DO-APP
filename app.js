var createError = require('http-errors');              // Importing a utility to create HTTP error objects.
var express = require('express');                      // Importing the Express framework for web server functionality.
var path = require('path');                            // Importing Node's built-in path module to handle file paths.
var cookieParser = require('cookie-parser');           // Middleware to parse cookies attached to the client requests.
var logger = require('morgan');                        // Middleware to log requests/responses in the console.
const mongoose = require('mongoose');                  // Importing Mongoose, an ODM library for MongoDB.
const cors = require('cors');


var indexRouter = require('./routes/index');           // Importing the default route handlers.
var usersRouter = require('./routes/users');           // Importing user-related route handlers.
const tasksRouter = require('./routes/tasks');         // Importing task-related route handlers.
var app = express();                                   // Initializing the Express application.

app.use(cors());                                       // Using the cors middleware to allow requests from all origins.


// view engine setup
app.set('views', path.join(__dirname, 'views'));       // Setting the views directory where templates are located.
app.set('view engine', 'jade');                        // Setting Jade (now Pug) as the default template engine.

app.use(logger('dev'));                                // Using Morgan logger in 'dev' mode for concise logs.
app.use(express.json());                                // Middleware to parse JSON request bodies.
app.use(express.urlencoded({ extended: false }));       // Middleware to parse URL-encoded request bodies.
app.use(cookieParser());                               // Initializing the cookie parser middleware.
app.use(express.static(path.join(__dirname, 'front-end/build'))); // Serving static files (like CSS, JS) from the 'public' directory.


app.use('/', indexRouter);                             // Mounting the default router to the root path.
app.use('/api/users', usersRouter);                        // Mounting the users router to the '/users' path.
app.use('/api/task', tasksRouter);                         // Mounting the tasks router to the '/task' path.

// The "catchall" handler: for any request that doesn't match another route,
// send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/front-end/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {                     
  next(createError(404));                              // Middleware to handle 404 errors by forwarding to the error handler.
});

mongoose.connect("mongodb+srv://dummy:1234@hyperiondev.zymaetg.mongodb.net/todoAppDB", {
    useNewUrlParser: true,                             // Using the new URL string parser.
    useUnifiedTopology: true,                          // Using the unified topology engine for connection.
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;                    // Setting the error message.
  res.locals.error = req.app.get('env') === 'development' ? err : {};  // Displaying error details only in development environment.

  // render the error page
  res.status(err.status || 500);                       // Sending an error status or 500 if no status is set.
  res.render('error');                                 // Rendering the error template.
});

module.exports = app;                                  // Exporting the app for external usage (e.g., starting the server).


