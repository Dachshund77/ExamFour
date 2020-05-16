// ******* //
// Imports //
// ******* //

//Extern files
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
//var fs = require('fs');
var https = require('https');
var cors = require('cors')

//Intern files
var coordinatesRoute = require('./routes/coordinatesEndpoint.js');

// ***** //
// Setup //
// ***** //

var app = express();
app.use(cors());
var urlCode = bodyParser.urlencoded({ extended: true });
app.use(express.static('public'));
app.use(bodyParser.json());
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

// ******** //
// Database //
// ******** //

//Change that if needed

mongoose.connect('mongodb://localhost:27017/TrackDB', { //TODO: Read from config file? Eventually design db layer
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// ******* //
// Routing //
// ******* //

//IMPORTANT, most middleware is configured and initalised by a case by case basis
//This was done in order to keep code readability high
//Only global middleware that uses every route should be configured here

//Note! The order of the middleware is important
app.use(function (request, response, next) { //This is actuallya logger now that i think about it
    console.log('Recieved request, processing..')
    next();
});

//Route init 
app.use('/coordinates', coordinatesRoute);

//Global middleware
//TODO REFACTOR THIS PART HERE, logging, error etc


app.use('/*', function (request, response) {
    response.status(404).json('Route not found!'); //Generic catch all error, not actually needed for anything except for showcasing what you can do :)
});


// *********** //
// Server init //

app.listen(3000, () => {
    console.log("server stared!");
});

//var httpsServer = https.createServer(credentials, app);
//httpsServer.listen(3000);

module.exports = app;
