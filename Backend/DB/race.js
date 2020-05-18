var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pointSchema = require('./point').schema;
//var coordinateModel = require('./coordinate').model

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO FIX incosisten naming convention
let raceSchema =
    new Schema({
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
        startLocation: {
            type: pointSchema,
            required: [true, 'Location is required!']
        },
        endLocation: {
            type: pointSchema,
            required: [true, 'Location is required!']
        }
    });

raceSchema.pre(['remove','findOneAndRemove'], function (next) {
    console.log('findOneAndRemove in race')
    let Race = this;
    console.log('---------------------------------------------------------------')
    console.log(Race);
    console.log('---------------------------------------------------------------')

    next();
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
            startLocation: this.startLocation,
            endLocation: this.endLocation
        },
        links: {
            self: "http://localhost:3000/races/" + this._id,
        },
        meta: {
            dbVersion: this.__v
        }
    }
}

exports.schema = raceSchema;
exports.model = mongoose.model('raceModel', raceSchema)