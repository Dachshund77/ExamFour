var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var coordinateModel = require('./coordinate').model

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

teamSchema.pre(['remove', 'findOneAndRemove'], function (next) {
    console.log('findOneAndRemove in race')
    let Race = this;

    //Get the team id from the route
    let teamId = this._conditions._id;

    //Remove
    coordinateModel.deleteMany({_id : teamId})

    next();
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