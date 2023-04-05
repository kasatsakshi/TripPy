import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: { type: String},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }],
    bookmarkedItineraries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "itinerary",
      }],
    createdBy : { type: mongoose.Schema.Types.ObjectId,
    ref: "user"},
});

const groupModel = mongoose.model("group",groupSchema);

export default groupModel