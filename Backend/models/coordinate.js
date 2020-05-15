var mongoose = require('mongoose');
var schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas

const coordinateModel =
    mongoose.model('coordinateModel', new schema({
        boatID: {
            type: String,
            required: [true, 'Boat ID is required!']
        },
        raceID: {
            type: String,
            required: [true, 'Race ID is required!']
        },
        latitude: {
            type: Number,
            default: 0,
            min: [-90, 'Latitude may not be less then -90!'],
            max: [90, 'Latitude may not be more then 90!']
        },
        longitude: {
            type: Number,
            default: 0,
            min: [-180, 'Longitutde may not be less thant -180'],
            max: [180, 'Longitutde may not be more thant 180']
        },
        dateTime: {
            type: Date,
            default: Date.now
        }
    },
        {
            timestamps: { createdAt: 'create_at' } //This will create a timestap when crated https://mongoosejs.com/docs/guide.html#timestamps
        }));


module.exports = coordinateModel;