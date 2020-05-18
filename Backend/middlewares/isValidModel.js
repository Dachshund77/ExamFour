var responses = require('../dataTransferObjects/responses');

/*
* Simple middleware that test if the validation fails or not and returns propper errorcodes.
*/
var middleware =
    function (modelType) {
        return async function (req, res, next) {
            try {
                console.log('TEST3');
                //init
                var obj = new modelType(req.body);

                console.log(obj);
                
                //Test model
                var validationError = obj.validateSync();

                console.log(validationError);
                //React 
                if (validationError) {
                    console.log('TEST2');
                    res.status(400).json(responses.badRequest("Json was invalid", validationError));
                    
                } else {
                    next();
                }
                

            } catch (err) {
                console.log('TEST1');
                console.log(err);
                res.status(500).json(responses.internalServerError("Unexpected error occured", err))
            }
        }
    };

module.exports = middleware;