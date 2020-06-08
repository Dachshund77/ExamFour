var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const timeSpanSchema = new Schema({
    type: {
        type: String,
        enum: ['Timespan'],
        required: true,
        default: 'Timespan'
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now(),
        validate: [
            { validator: startTimeValidator, msg: 'Start time is not valid' },
        ]
    },
    endTime: {
        type: Date,
        required: false,
        //default: Date.now(),
    }
});

function startTimeValidator(val) {
    console.log('startTimeValidator');
    console.log(this.endTime);

    this.endTime
    return true
};

exports.schema = timeSpanSchema;