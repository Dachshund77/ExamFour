var jwt = require('jsonwebtoken');
var responses = require('../dataTransferObjects/responses');

//Basically works by comparing the headder with the rpute parameter
var middleware =
    function(req, res, next) {
        try {
            //Skip if already authorised
            if (res.locals.isAuthorized == false || res.locals.isAuthorized == undefined) {
                //get payload
                var headerAuth = req.headers.authorization;
                var array = headerAuth.split(' ');
                var token = array[1];
                var decoded = jwt.decode(token);

                //compate with the provided paramter
                if (decoded.name == req.params.name) { //This kind amkaes the assumption that the req.parmas has a name field
                    console.log("IS OWNER");

                    res.locals.isAuthorized = true;
                } else {
                    console.log("IS NOT OWNER");

                    res.locals.isAuthorized = false;
                }
            }
            next();
        } catch (err) {
            console.log(err);
            res.status(500).json(responses.internalServerError("Unexpected error occured", err))
        }
    };

module.exports = middleware;