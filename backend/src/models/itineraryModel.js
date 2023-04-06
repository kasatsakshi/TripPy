import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    destination: { type: String},
    startDate: {type: Date },
    endDate: {type: Date},
	budget: { type: Number },
    itineraryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "itineraryItem",
      }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    bookmarkedBy : {type: mongoose.Schema.Types.ObjectId,
    ref: "user"},
    // Interests are given by users
    interests: [{
        interest: String,
        enteredBy: {type: mongoose.Schema.Types.ObjectId,
            ref: "user"}
    }],
    createdBy: {type: mongoose.Schema.Types.ObjectId,
        ref: "user"},
    createdTimestamp: {type: Date},
    updatedTimestamp: {type: Date}
});

const itineraryModel = mongoose.model("itinerary",itinerarySchema);

export default itineraryModel