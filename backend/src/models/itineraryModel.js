import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    destination: { type: String},
    stayPeriod: {
        startDate: {type: Date },
        endDate: {type: Date}
    },
	budget: { type: Number },
    itineraryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "itineraryItem",
      }],
    bookmarkedBy : {type: mongoose.Schema.Types.ObjectId,
    ref: "user"},
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