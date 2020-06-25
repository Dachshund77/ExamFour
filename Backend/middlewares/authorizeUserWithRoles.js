var config = require('../configs/config')
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose')
var User = mongoose.model('userModel')
var responses = require('../dataTransferObjects/responses');

var middleware =
    function(allowedRoles) {
        return async function(req, res, next) {
            try {
                //Skip if already authorised
                if (res.locals.isAuthorized == false || res.locals.isAuthorized == undefined) {
                    //init 
                    var isAllowed = false;

                    //get the token from the header 
                    var headerAuth = req.headers.authorization;
                    var array = headerAuth.split(' ');
                    var token = array[1];

                    //Decode 
                    var decoded = jwt.decode(token);

                    console.log(decoded);


                    //get dbUser from DB and chache it into res
                    var dbUser = await User.findOne({ name: decoded.name })

                    //Test against allowed roles
                    userRole = dbUser.role;
                    allowedRoles.forEach(element => {
                        if (element == userRole) {
                            isAllowed = true;
                        }
                    });

                    //Set authorisation if valid
                    if (isAllowed) {
                        res.locals.isAuthorized = true;
                    } else {
                        res.locals.isAuthorized = false;
                    }
                }

                //Go to next middleware
                next();

            } catch (err) {
                console.log(err);
                res.status(500).json(responses.internalServerError("Unexpected error occured", err))
            }
        };
    };

module.exports = middleware;