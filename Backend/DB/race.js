var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pointSchema = require('./point').schema;

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
                message: 'End time may not be before start time!'
            }
        },
        startLocation: {
            type: pointSchema,
            required: [true, 'Start Location is required!']
        },
        endLocation: {
            type: pointSchema,
            required: [true, 'End Location is required!']
        }
    });

raceSchema.post(['remove', 'findOneAndRemove', 'deleteMany', 'deleteOne'],  async function (doc) {
    //init   
    //console.log(doc) //We could in theory fuck with the doc
    //doc.test = 'sss'
    let coordinateModel = mongoose.model('coordinateModel')
    let removeID = this._conditions._id; //The called paramter in the url
    
    //Removing coordiantes that are realted
    await coordinateModel.deleteMany({ raceID: removeID });

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