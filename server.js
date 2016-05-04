// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Https = require('https');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.send('A wrapper API at /uprns which accepts a json array with uprn values and outputs an array of results');   
});

// more routes for our API will happen here

router.route( '/uprns' ).post( function ( request, response ) {
    response.setHeader( 'content-type', 'application/text' );
    //console.log( 'first element from the array is ' + request.body.UPRNS[ 0 ] ); // your  1st element in  JSON array.

    //console.log( 'Number of items in array is ' + request.body.UPRNS.length );
    
    //If UPRN array is empty and has no values OR has more than 100 entries 
    
    if (request.body.UPRNS.length == 0 || request.body.UPRNS.length > 100 ) {
         response.send( 'Number of UPRNS in request body must be between 1 and 100' );
    }
    
    var output = [];
    var obj = '';

    for ( var i = 0; i < request.body.UPRNS.length; i++ ) {

        obj = request.body.UPRNS[ i ];

        console.log( obj );

        //Make  HTTP calls to

        var options = {
            host: 'orbisdigital.azure-api.net',
            path: '/nosecurity/addresses?uprn=' + obj // full URL as path
        };

        Https.request( options, callback ).end();

    }

    var countResponses = 0;
    // Don't make functions in a loop, so I moved this function down
    // here.
    function callback( res ) {

        res.on( 'data', function ( chunk ) {
            output.push( chunk.toString() );
        });

        // Handles an error
        request.on('error', function(err) {
          console.error(err.stack);
          response.statusCode = 500; // or what ever.
          response.send(500, 'there was an error');
        });

        //the whole response has been recieved
        res.on( 'end', function () {
           countResponses++;
            if (countResponses === request.body.UPRNS.length) {

                // Previously this code was executed directly 
                // after the loop finished.  It did not wait for
                // all the responses, so it sent the empty response.
                // However, the other console.log(output) statements
                // were called after this.
                //
                // There is a bug here that if request.body.UPRNS.length
                // is zero, then the user will never get a response.  I 
                // let you fix this up :).
                 //console.log( output );
                response.send( output );
            }
        } );

    }

} );

//Handler for all invalid paths



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);