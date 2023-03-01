const mongoose = require("mongoose");

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
    bookmarked: {type: Boolean},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectId,
                    ref: "user"}
});

const itineraryModel = mongoose.model("itinerary",itinerarySchema);

module.exports =itineraryModel;