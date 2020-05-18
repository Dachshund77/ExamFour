var mongoose = require('mongoose');
var pointSchema = require('./point').schema;
var Schema = mongoose.Schema;
var raceModel = require('./race').model
var teamModel = require('./team').model

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO incosisten naming convention
//TODO possible imrpove with https://docs.mongodb.com/manual/reference/geojson/#point
const coordinateSchema =
    new Schema({
        teamID: {
            type: Schema.Types.ObjectId,
            ref: "teamModel",
            required: [true, 'Team ID is required!'],
            validate: [
                { validator: teamRecordExists, msg: 'Team does not exist' }
            ]
        },
        raceID: {
            type: Schema.Types.ObjectId,
            ref: "raceModel",
            required: [true, 'Race ID is required!'],
            validate: [
                { validator: raceRecordExists, msg: 'Race does not exist'}
            ]
        },
        location: {
            type: pointSchema,
            required: [true, 'Location is required!']
            //Kinda repeating error message on validation
        }
    },
        {
            timestamps: { createdAt: 'createdAt' }, //This will create a timestap when crated https://mongoosejs.com/docs/guide.html#
        });

async function teamRecordExists(val) { //Well technical this failing should lead to a 400 bad request not 500.
    let result = null;
    result = await teamModel.exists({ _id: val });
    return result;
}

async function raceRecordExists(val) {
    let result = null;
    result = await raceModel.exists({ _id: val });
    return result;
}

coordinateSchema.pre(['save', 'insertMany', 'update', 'updateOne', 'findOneAndUpdate', 'updateMany'], function (next) {
    //Test if race ist actually existing
    raceModel.find()

    //Test if team is actually existing

    next()
});

coordinateSchema.pre('insertMany', function (next) {
    const err = new mongoose.Error('something went wrong');
    //err.test = new Error('something went SUPER wrong');
    //err.code = 11000;
    //console.log(err);
    //JSON.stringify(err);
    //next(err);
    console.log('find')
    next();
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
            geoJson: this.location,
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
            team: {
                links: {
                    self: "http://localhost:3000/teams/" + this.teamID
                },
                data: {
                    type: 'team',
                    _id: this.teamID
                },
            }
        }
    }
}

exports.schema = coordinateSchema;
exports.model = mongoose.model('coordinateModel', coordinateSchema);