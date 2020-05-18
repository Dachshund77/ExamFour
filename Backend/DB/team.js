var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO incosisten naming convention
//TODO possible imrpove with https://docs.mongodb.com/manual/reference/geojson/#point
const teamSchema =
    new Schema({
        teamName: {
            type: String,
            required: [true, 'Team Name is required!']
        }
    });

/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
teamSchema.methods.toJSON = function () {
    return {
        type: 'Team',
        _id: this._id,
        attributes: {
            teamName: this.teamName,
        },
        links: {
            self: "http://localhost:3000/teams/" + this._id,
        },
        meta: {
            dbVersion: this.__v
        }
    }
}

exports.schema = teamSchema;
exports.model = mongoose.model('teamModel', teamSchema)