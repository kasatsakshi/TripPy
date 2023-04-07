import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    destination: { type: String},
    startDate: {type: Date },
    endDate: {type: Date},
	budget: { type: Number },
    itineraryList: [{Day: { type: String},
        Places: [{
            Name: {type: String},
            Latitude:{type: Number},
            Longitude:{type: Number},
            Popularity:{type: String},
            Description: {type: String},
            Category: {type: String},
            Cost: {type: Number}
        }]}],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    bookmarkedBy : {type: mongoose.Schema.Types.ObjectId,
    ref: "user"},
    // Interests are given by users
    // interests: [{
    //     interest: String,
    //     enteredBy: {type: mongoose.Schema.Types.ObjectId,
    //         ref: "user"}
    // }],
    interests: [{type: String}],
    createdBy: {type: mongoose.Schema.Types.ObjectId,
        ref: "user"},
    createdTimestamp: {type: Date},
    updatedTimestamp: {type: Date}
});

const itineraryModel = mongoose.model("itinerary",itinerarySchema);

export default itineraryModel