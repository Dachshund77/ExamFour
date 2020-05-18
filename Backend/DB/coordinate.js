var mongoose = require('mongoose');
var pointSchema = require('./point').schema;
var Schema = mongoose.Schema;
//var raceShema = require('./race')

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO incosisten naming convention
//TODO possible imrpove with https://docs.mongodb.com/manual/reference/geojson/#point
const coordinateSchema =
    new Schema({
        boatID: {
            type: String,
            required: [true, 'Boat ID is required!']
        },
        raceID: {
            type: String,
            required: [true, 'Race ID is required!'] //Custom validation?
        },
        location: {
            type: pointSchema,
            required: true          
            //Kinda repeating error message on validation
        }
    },
        {
            timestamps: { createdAt: 'createdAt' }, //This will create a timestap when crated https://mongoosejs.com/docs/guide.html#
        });

/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
coordinateSchema.methods.toJSON = function () {
    return {
        type: 'Coordinate',
        _id: this._id,
        attributes: {
            geoJson : this.location,      
            createdAt: this.createdAt
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
                    type: 'race',
                    _id: this.raceID
                },
            },
            boat: {
                links: {
                    self: "http://localhost:3000/boats/" + this.boatID
                },
                data: {
                    type: 'boat',
                    _id: this.boatID
                },
            }         
        }
    }
}

exports.schema = coordinateSchema;
exports.model = mongoose.model('coordinateModel', coordinateSchema);