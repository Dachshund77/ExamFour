var mongoose = require('mongoose');
var schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas

let coordinateSchema =
    new schema({
        boatID: {
            type: String,
            required: [true, 'Boat ID is required!']
        },
        raceID: {
            type: String,
            required: [true, 'Race ID is required!'] //Custom validation?
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
            min: [-180, 'Longitutde may not be less then -180'],
            max: [180, 'Longitutde may not be more then 180']
        }
    },
        {
            timestamps: { createdAt: 'create_at' }, //This will create a timestap when crated https://mongoosejs.com/docs/guide.html#
        });

/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
coordinateSchema.methods.toJSON = function () {
    return {
        type: 'Coordinates',
        _id: this._id,
        attributes: {
            latitude: this.latitude,
            longitude: this.longitude,
            create_at: this.create_at
        },
        links: {
            self: "http://localhost:3000/coordinates/" + this._id,
        },
        meta: {
            dbVersion: this.__v
        },
        relationships: {
            race: {
                links: {
                    self: "http://localhost:3000/races/" + this.raceID
                },
                data: {
                    type: 'races',
                    _id: this.raceID
                },
            },
            boat: {
                links: {
                    self: "http://localhost:3000/boats/" + this.boatID
                },
                data: {
                    type: 'boats',
                    _id: this.boatID
                },
            }         
        }
    }
}

module.exports = mongoose.model('coordinateModel', coordinateSchema)