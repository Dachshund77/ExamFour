var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//https://geojson.org/ RFC7946 specification
const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number], //[longitude,latitude] 
        default: [0, 0],
        required: true,
        validate: [
            { validator: longitudeValidator, msg: 'Longitutde may not be less then -180 or bigger then 180!' },
            { validator: latitudeValidator, msg: 'Latitude may not be less then -90 or bigger then 90!' },
            { validator: pointValidator, msg: 'Point must contain exactly 2 values!' }
        ]
    }
});

function longitudeValidator(val) {
    return (-90 <= val[0] && val[0] <= 90)
};

function latitudeValidator(val) {
    console.log(val[1])
    return (-180 <= val[1] && val[1] <= 180)
};

function pointValidator(val) {
    return val.length == 2
};

exports.schema = pointSchema;