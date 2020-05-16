var express = require('express');
var mongoose = require('mongoose')

var Coordinate = require('../models/coordinate.js');
var responses = require('../dataTransferObjects/responses');
var isValidModel = require('../middlewares/isValidModel');
var isValidObjectID = require('../middlewares/isValidObjectID');

var router = express.Router();

//Post a Coordinate
const postEndpoint = '/';
router.post(postEndpoint, [isValidModel(Coordinate)]);
router.route(postEndpoint) //get all
    .post(async function (req, res) {
        try {
            //Init values
            var newCord = new Coordinate(req.body);

            //Insert in DB
            newCord.save(function (err) {
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
                    res.status(201).json(responses.created(newCord));
                }
            });

        } catch (err) {
            console.log(err);
            res.status(500).json(responses.internalServerError("Unexpected error occured", err))
        }
    });

//Update a device 
const putEndpoint = '/:_id';
router.put(putEndpoint, [
    isValidObjectID,
    isValidModel(Coordinate)
]);
router.route(putEndpoint)
    .put(async function (req, res) {
        try {
            //Update in db
            //BUG! in JSON Passing along the object id that has cahnge break this, why even allow updae to id?
            Coordinate.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, doc) {
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
const deleteEndpoint = '/:_id';
router.put(deleteEndpoint, [isValidObjectID]);
router.route(deleteEndpoint)
    .delete(async function (req, res) {
        try {
            //delete
            await Coordinate.findOneAndDelete({ _id: req.params._id }, function (err, doc) {
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
            res.status(500).json('Internal server error');
        }
    });

//Get by id 



module.exports = router;