var express = require('express');
var mongoose = require('mongoose')
var Team = mongoose.model('teamModel')
var responses = require('../dataTransferObjects/responses');
var isValidObjectID = require('../middlewares/isValidObjectID');
var requireAuthorisation = require("../middlewares/requireAuthorization")
var requireAuthentication = require("../middlewares/requireAuthentication")
var authorizeUserWithRoles = require("../middlewares/authorizeUserWithRoles")
var authorizeOwner = require("../middlewares/authorizeTeamEndpointOwner")


var router = express.Router();

//Post a Team
router.post('/', [
    requireAuthentication,
    authorizeUserWithRoles(['Admin', 'User']),
    requireAuthorisation,
    isValidObjectID
], async function(req, res) {
    try {
        console.log(req.body)

        //Init values
        var newTeam = new Team(req.body);

        //Insert in DB
        newTeam.save(function(err) {
            if (err) {
                if (err.code === 11000) {
                    //duplicate key
                    res.status(400).json(responses.badRequest("Key exists already in database", err));
                    return
                }
                if (err instanceof mongoose.Error.ValidationError) {

                    res.status(400).json(responses.badRequest("Validation failed for request", err));
                    return
                } else { //need other error
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", err));
                    return
                }
            } else {
                //successfully inserted               
                res.status(201).json(responses.created(newTeam));
            }
        });
        console.log(newTeam)
        console.log('ID')
        console.log(newTeam.id)

    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Update a device 
router.put('/:_id', [
    requireAuthentication,
    authorizeOwner,
    authorizeUserWithRoles(['Admin']),
    requireAuthorisation,
    isValidObjectID
], async function(req, res) {
    try {
        //Update in db
        //BUG! in JSON Passing along the object id that has cahnge break this, why even allow updae to id?
        Team.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function(err, doc) {
            if (err) {
                if (err.code === 11000) {
                    //duplicate key
                    res.status(400).json(responses.badRequest("Key exists already in database", err));
                    return
                }
                if (err instanceof mongoose.Error.ValidationError) {
                    res.status(400).json(responses.badRequest("Validation failed for request", err));
                    return
                } else { //need other error
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", err));
                    return
                }
            } else {
                if (doc == null) {
                    //Could not find ressource
                    res.status(404).json(responses.notFound("Ressource was not found for " + req.params._id));
                    return
                } else {
                    //respond on succes
                    res.status(200).json(responses.ok(doc));
                    return
                }
            }
        });
    } catch (err) {
        //Shit hit the fan somehow
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Delete a Team by id 
router.delete('/:_id', [
    requireAuthentication,
    authorizeOwner,
    authorizeUserWithRoles(['Admin']),
    requireAuthorisation,
    isValidObjectID
], async function(req, res) {
    try {
        //delete
        await Team.deleteOne({ _id: req.params._id }, function(err, doc) {
            if (err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    res.status(400).json(responses.badRequest("Validation failed for request", err));
                    return
                } else {
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", err));
                    return
                }
            } else {
                if (doc.n == 0) { //Not maatched with anything
                    //Could not find ressource
                    res.status(404).json(responses.notFound("Ressource was not found for " + req.params._id));
                } else {
                    //respond on succes //204
                    res.status(200).json(responses.noContent());
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Get by id 
router.get('/:_id', [
    requireAuthentication,
    authorizeUserWithRoles(['Admin', 'User']),
    requireAuthorisation,
    isValidObjectID
], async function(req, res) {
    try {

        await Team.findOne({ '_id': req.params._id }, function(err, doc) {
            if (err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    res.status(400).json(responses.badRequest("Validation failed for request", err));
                    return
                } else {
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", err));
                    return
                }
            } else {
                if (doc == null) {
                    //Could not find ressource
                    res.status(404).json(responses.notFound("Ressource was not found"));
                    return
                } else {
                    //respond on succes //200 
                    res.status(200).json(responses.ok(doc));
                    return
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Get by filer 
router.get('/:teamName?', [
    requireAuthentication,
    authorizeOwner,
    authorizeUserWithRoles(['Admin']),
    requireAuthorisation,
    isValidObjectID
], async function(req, res) { //Insted of passing on big query in it is easyer to pass multiple query params
    try {
        var filter = {}
        if (req.query.teamName != null) {
            filter.teamName = { $regex: req.query.teamName } //We format regEx, we sohuld probably not allow special sin in teamNames
        }

        console.log(filter);

        await Team.find(filter, function(err, doc) {
            if (err) {
                //catch all clasue
                res.status(500).json(responses.internalServerError("Database error occured", err));
                return
            } else {
                //respond on succes //200 
                res.status(200).json(responses.ok(doc));
                return
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

module.exports = router;