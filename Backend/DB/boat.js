var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO incosisten naming convention
//TODO possible imrpove with https://docs.mongodb.com/manual/reference/geojson/#point
let boatSchema =
    new Schema({
        boatName: {
            type: String,
            required: [true, 'Boat Name is required!']
        }
    });

/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
boatSchema.methods.toJSON = function () {
    return {
        type: 'Boat',
        _id: this._id,
        attributes: {
            boatName: this.boatName,
        },
        links: {
            self: "http://localhost:3000/boats/" + this._id,
        },
        meta: {
            dbVersion: this.__v
        }
    }
}

exports.schema = boatSchema;
exports.model = mongoose.model('boatModel', boatSchema)