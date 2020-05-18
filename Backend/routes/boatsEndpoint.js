var express = require('express');
var mongoose = require('mongoose')

var Boat = require('../models/boat.js');
var responses = require('../dataTransferObjects/responses');
var isValidModel = require('../middlewares/isValidModel');
var isValidObjectID = require('../middlewares/isValidObjectID');
var getRelatedCoordinates = require('../middlewares/getRelatedCoordinates');

var router = express.Router();

//Post a Boar
router.post('/', [isValidModel(Boat)], async function (req, res) {
    try {
        //Init values
        var newBoat = new Boat(req.body);

        //Insert in DB
        newBoat.save(function (err) {
            if (err) {
                if (err.code === 11000) {
                    //duplicate key
                    res.status(400).json(responses.badRequest("Key exists already in database", err));
                }
                else if (err) { //need other error
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", err));
                }
            }
            else {
                //successfully inserted
                res.status(201).json(responses.created(newBoat));
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Update a device 
router.put('/:_id', [
    isValidObjectID,
    isValidModel(Boat)
], async function (req, res) {
    try {
        //Update in db
        //BUG! in JSON Passing along the object id that has cahnge break this, why even allow updae to id?
        Boat.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, doc) {
            if (err) {
                if (err.code === 11000) {
                    //duplicate key
                    res.status(400).json(responses.badRequest("Key exists already in database", dbError));
                }
                else if (err) { //need other error
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", dbError));
                }
            } else {
                if (doc == null) {
                    //Could not find ressource
                    res.status(404).json(responses.notFound("Ressource was not found for " + req.params._id));
                }
                else {
                    //respond on succes
                    res.status(200).json(responses.ok(doc));
                }
            }
        });
    } catch (err) {
        //Shit hit the fan somehow
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Delete a device by id 
router.delete('/:_id', [isValidObjectID], async function (req, res) {
    try {
        //delete
        await Boat.findOneAndDelete({ _id: req.params._id }, function (err, doc) {
            if (err) {
                //catch all clasue
                res.status(500).json(responses.internalServerError("Database error occured", err));
            }
            else {
                if (doc == null) {
                    //Could not find ressource
                    res.status(404).json(responses.notFound("Ressource was not found for " + req.params._id));
                } else {
                    //respond on succes //204
                    res.status(200).json(responses.ok(doc));
                }
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//Get by id 
router.get('/:_id/', [isValidObjectID], async function (req, res) {
    try {
        await Boat.findById(req.params._id, function (err, doc) {
            if (err) {
                //catch all clasue
                res.status(500).json(responses.internalServerError("Database error occured", err));
            }
            else {
                if (doc == null) {
                    //Could not find ressource
                    res.status(404).json(responses.notFound("Ressource was not found for " + req.params._id));
                } else {
                    //respond on succes //200 
                    res.status(200).json(test);
                }
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

module.exports = router;