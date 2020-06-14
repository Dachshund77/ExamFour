var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 32,
        required: true
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
userSchema.methods.toJSON = function() {
    return {
        type: 'User',
        _id: this._id,
        attributes: {
            name: this.name,
            role: this.time,
        },
        links: {
            self: "http://localhost:3000/users/" + this._id,
        },
        meta: {
            dbVersion: this.__v
        }
    }
}

//.schema = userSchema;
//exports.model = mongoose.model('userModel', userSchema)
module.exports = mongoose.model('userModel', userSchema)