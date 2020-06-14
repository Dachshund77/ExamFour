var mongoose = require('mongoose');
var timeSpanSchema = require('./timeSpan').schema;
var Schema = mongoose.Schema;

//https://mongoosejs.com/docs/validation.html info about validation schemas
//TODO incosisten naming convention
//TODO possible imrpove with https://docs.mongodb.com/manual/reference/geojson/#point
const teamSchema =
    new Schema({
        time: { //Please find a better name god damit brain
            type: timeSpanSchema,
            required: [true, 'Time is required!'], //weird
            default: () => ({}) //This invokes the childrens required
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: "userModel",
            required: [true, 'Admins ID is required!'],
        },
        //previous: {
        //    type: Schema.Types.ObjectId
        //},
        //next: {
        //    type: Schema.Types.ObjectId
        //},
        head: {
            type: Schema.Types.ObjectId,
            required: true,
            default: function() {
                return this._id
            }
        },
        teamName: {
            type: String,
            required: [true, 'Team Name is required!']
        }
    });

//Can i yeet this>
//teamSchema.index({ _id: 1, outdated: 1 }, { unique: true }) // 1 ascending -1 is decending https://stackoverflow.com/questions/12573753/creating-multifield-indexes-in-mongoose-mongodb

/*
teamSchema.virtual('id').get(function () { //Conncat the internalID and ..
return this._id.internalID + this._id.test
})
*/




teamSchema.pre('findOneAndUpdate', async function(next) {
    try {

        //Make copy of old one for historic reasons
        await this.findOne({ _id: this._conditions._id }, function(err, doc) {
            if (err) {
                throw err
            } else {

                var olderOne = doc;
                olderOne._id = mongoose.mongo.ObjectID();

                olderOne.__v = doc.__v //For wahtever reason i cant update _v

                //Set the old ones time

                olderOne.time.startTime = doc.time.startTime;
                olderOne.time.endTime = Date.now();

                //Save old one
                olderOne.isNew = true;


                olderOne.save()
            }
        });
        //Update the orginals starttime
        this._update.time.endTime = undefined //Alway undefined when head
        this._update.time.startTime = Date.now()

        /*
                console.log(this._conditions._id)
        
                var headDoc;
                await this.findOne({ _id: this._conditions._id }, function (err, doc) {
                    headDoc = doc;
                })
        
                //Get a holde of current record and make copy. Also change the needed values
                var newFirstDoc; //new doc that will be first after head
                newFirstDoc = headDoc;
                //var newId = mongoose.mongo.ObjectID();
                newFirstDoc._id = mongoose.mongo.ObjectID();
                newFirstDoc.next = headDoc.head; //Current head become the next 
                newFirstDoc.previous = headDoc.previous //Current previous become this previous
                newFirstDoc.isNew = true;
                await newFirstDoc.save();
        
                //change the previous FirstDoc
                if (headDoc.previous != undefined) {
                    var previousFirstDoc;
                    await this.findOneAndUpdate({ _id: headDoc.previous }, { next: newFirstDoc._id }, function (err, doc) {
        
                    })
                }
        
                this._update.previous = newFirstDoc._id
        
        
        
                if (true) {
        
                } else {
                    this._id.outdated = Date.now();
                }
        */
        next();
    } catch (error) {
        console.log(error)
        throw new mongoose.Error(error)
    }
});



teamSchema.pre(['update', 'findOneAndUpdate'], async function(next) {
    try {
        this.update({}, { $inc: { __v: 1 } })
        next()
    } catch (error) {
        throw new mongoose.Error(error)
    }
});

//var test = mongoose.model('teamModel', teamSchema)
teamSchema.pre('findOne', async function(next) {
    //this._id.internalID = mongoose.mongo.ObjectID();
    //this._id.test = 'fuck'
    //console.log('pre find one_')
    //this.yolo = 'FUCKIN WORKS'
    //console.log(this)

    //var test = mongoose.model('teamModel', teamSchema)
    //var query = test.where({ _id: '1' })
    //query.findOne(function () {
    //    console.log('wtf is this')
    //});

    next();
});

//Cleans up coordinates when removed
teamSchema.post(['remove', 'findOneAndRemove', 'deleteMany', 'deleteOne'], async function(doc) {
    //init   

    let coordinateModel = mongoose.model('coordinateModel')
    let removeID = this._conditions._id; //The called paramter in the url

    //Removing coordiantes that are realted
    await coordinateModel.deleteMany({ teamID: removeID });
});


/**
 * Overwriting for custom JSON responses
 */
//https://jsonapi.org/
teamSchema.methods.toJSON = function() {
    return {
        type: 'Team',
        _id: this._id,
        attributes: {
            time: this.time,
            teamName: this.teamName,
            admin: this.admin
        },
        links: {
            self: "http://localhost:3000/teams/" + this._id,
            head: "http://localhost:3000/teams/" + this.head,
            //next: "http://localhost:3000/teams/" + this.next,
            //previous: "http://localhost:3000/teams/" + this.previous
        },
        meta: {
            dbVersion: this.__v
        }
    }
}


//exports.schema = teamSchema;
//exports.model = mongoose.model('teamModel', teamSchema)
module.exports = mongoose.model('teamModel', teamSchema)