var config = require('../configs/config')
var jwt = require('jsonwebtoken');
var responses = require('../dataTransferObjects/responses');


var middleware =
    function(req, res, next) {
        try {
            //init 
            const key = config.secret;

            //get the token from the header
            var headerAuth = req.headers.authorization;
            if (headerAuth == undefined) {
                res.status(401).json(responses.unauthorized("No auth provided", undefined));
            } else {
                var array = headerAuth.split(' ');
                var token = array[1];

                //Verify
                jwt.verify(token, key, function(err, decoded) {
                    if (err) {
                        res.status(401).json(responses.unauthorized("Auth token was invalid", err));
                        return;
                    } else {
                        next();
                    }
                });
            }


        } catch (err) {
            console.log(err);
            res.status(500).json(responses.internalServerError("Unexpected error occured", err))
        }
    };

module.exports = middleware;