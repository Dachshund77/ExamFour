var mongoose = require('mongoose');
var schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO FIX incosisten naming convention
let raceSchema =
    new schema({
        raceName: {
            type: String,
            required: [true, 'Race must have a name!']
        },
        startTime: { //Well are we allowing to have start and end dates before now?
            type: Date,
            default: Date.now(),
            required: [true, 'Start time required!']
        },
        endTime: {
            type: Date,
            default: Date.now(),
            required: [true, 'End time is required!'],
            validate: {
                validator: function (v) {
                    if (this.endTime < this.startTime) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: 'End time may not be before stat time!'
            }
        },
        startLatitude: {
            type: Number,
            default: 0,
            min: [-90, 'StartLatitude may not be less then -90!'],
            max: [90, 'StartLatitude may not be more then 90!']
        },
        endLatitude: {
            type: Number,
            default: 0,
            min: [-90, 'EndLatitude may not be less then -90!'],
            max: [90, 'EndLatitude may not be more then 90!']
        },
        startLongitude: {
            type: Number,
            default: 0,
            min: [-180, 'StartLongitutde may not be less then -180'],
            max: [180, 'StartLongitutde may not be more then 180']
        },
        endLongitude: {
            type: Number,
            default: 0,
            min: [-180, 'EndLongitutde may not be less then -180'],
            max: [180, 'EndLongitutde may not be more then 180']
        }
    });

/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
raceSchema.methods.toJSON = function () {
    return {
        type: 'Race',
        _id: this._id,
        attributes: {
            raceName: this.raceName,
            startTime: this.startTime,
            endTime: this.endTime,
            startLatitude: this.startLatitude,
            startLongitude: this.startLongitude,
            endLatitude: this.endLatitude,
            endLongitude: this.endLongitude,
        },
        links: {
            self: "http://localhost:3000/races/" + this._id,
        },
        meta: {
            dbVersion: this.__v
        }       
    }
}

module.exports = mongoose.model('raceModel', raceSchema)