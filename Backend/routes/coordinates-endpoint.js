var express = require('express');
var Coordinate = require('../models/coordinate.js');

var router = express.Router();

//get all devices
//router.get('/', );
router.route('/') //get all
    .get(async function (req, res) {

        //send response 
        res.status(200).json("HELLO WORLD");
    });

module.exports = router;