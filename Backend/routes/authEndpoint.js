var express = require('express');
var mongoose = require('mongoose')
var User = mongoose.model('userModel')
var bcrypt = require('bcrypt');
var responses = require('../dataTransferObjects/responses');
var jwt = require('jsonwebtoken');
var config = require('../configs/config')

var router = express.Router();

//Standard registration
router.post('/registration', async function(req, res) {
    try {
        //Init values
        var newUser = new User(req.body);
        console.log(newUser);

        //generate password
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));

        //ALWAYS starts with the User role
        newUser.role = 'User'

        //Insert in DB
        newUser.save(function(err) {
            if (err) {
                if (err.code === 11000) {
                    //name is already in db
                    res.status(409).json(responses.conflict('Username taken already', err));
                    return;
                }
                if (err instanceof mongoose.Error.ValidationError) {
                    res.status(400).json(responses.badRequest("Validation failed for request", err));
                    return
                } else {
                    //catch all clasue
                    res.status(500).json(responses.internalServerError("Database error occured", err));
                    return;
                }
            } else {
                //success
                res.status(201).json(responses.created(newUser));
                return;
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

//User login (Assigning of token) as standard way
router.post('/login', async function(req, res) {
    try {

        //find user 
        var dbUser = await User.findOne({ name: req.body.name })
        if (dbUser == null) {
            //User not found in db
            res.status(404).json(responses.notFound("User not found"));
            return;
        }

        //Comparing                    
        var isCorrect = bcrypt.compareSync(req.body.pw, dbUser.password);

        if (isCorrect) {
            //Assign token (Password does not need to go in the toke?)
            var token = jwt.sign({ name: req.body.name, pw: req.body.pw }, config.secret, { expiresIn: 300000000 })
                //Return token
            res.status(200).json(responses.ok({ "token": token })); //Dirty as fuck, probaly should define a DTO
            return;
        } else {
            res.status(401).json(responses.unauthorized("Username was rejected", dbUser));
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(responses.internalServerError("Unexpected error occured", err))
    }
});

module.exports = router;