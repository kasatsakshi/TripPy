const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: { type: String},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }],
    bookMarkeditineraries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "itinerary",
      }]
});

const groupModel = mongoose.model("group",groupSchema);

module.exports =groupModel;