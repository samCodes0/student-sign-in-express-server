// THE MAIN FILE THAT CONTROL THE WEB APP SERVER
const express = require('express');  // importing express into the app
const apiRoutes = require('./routes/api');
// importing the path module to get the path to the static files
const path = require('path');

const app = express();  // gaining a local instance of an express app
// using the path.join method the get the path to the static files
const staticFilePath = path.join(__dirname, 'client', 'dist');
const staticFiles = express.static(staticFilePath);
// when we have requests to the home page, serve static files - the vue app index.html
app.use('/', staticFiles);

// built in middleware function provided by express to parse incoming requests with JSON payloads
// the path argument for app.use() will default to '/' which is the root path if a path is not specified.
// this means that in the example below, the root path is set to use the middleware function provided by express
app.use(express.json());
app.use('/api', apiRoutes);
app.use(function(req, res, next) {
    // in the case that the router is not setup to handle to route, this will run
    res.status(404).send('Sorry, page not found');
})

// it is important to make sure the err parameter is the first parameter in the callback function
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Server error');
})
// here we are setting the server to use either the port set by the environment that is running the server,
// such as azure or another cloud platform, or port 3000 for local development
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port);
})