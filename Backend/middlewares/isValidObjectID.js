var responses = require('../dataTransferObjects/responses');
var mongoose = require('mongoose')

/**
 * Assumes that the object id is _id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
var middleware = 
    function (req, res, next) {
        try {
            if (!mongoose.isValidObjectId(req.params._id)) {
                return res.status(400).json(responses.badRequest(req.params._id + " is not a valid ObjectID"))
            }

            //Go to next middleware
            next();

        } catch (err) {
            console.log(err);
            res.status(500).json(responses.noContent())
        }

    };

module.exports = middleware;