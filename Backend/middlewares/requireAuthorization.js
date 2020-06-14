var responses = require('../dataTransferObjects/responses');

var middleWare =
    function(req, res, next) {
        try {
            console.log(res.locals.isAuthorized);

            //Check varaible
            if (res.locals.isAuthorized == undefined ||
                res.locals.isAuthorized == false) {
                //Is fobidden
                res.status(403).json(responses.forbidden("Acces was denied", undefined));

            } else {
                //Allow further middleware
                next();
                return;
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(responses.internalServerError("Unexpected error occured", err))
        }
    };

module.exports = middleWare;