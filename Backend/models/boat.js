var mongoose = require('mongoose');
var schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO incosisten naming convention
//TODO possible imrpove with https://docs.mongodb.com/manual/reference/geojson/#point
let boatSchema =
    new schema({
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

module.exports = mongoose.model('boatModel', boatSchema)