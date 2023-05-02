import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    itineraryName : {type: String},
    destination: { type: String},
    startDate: {type: Date },
    endDate: {type: Date},
	budget: { type: Number },
    imageUrl: {type: String},
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
        unique: true
    }],
    isFavorite : {type: Boolean,
                    default: false},
    isPublic : {
        type : Boolean,
        default: false
    },
    interests: [{type: String}],
    createdBy: {type: mongoose.Schema.Types.ObjectId,
        ref: "user"},
    createdTimestamp: {type: Date},
    updatedTimestamp: {type: Date, 
                        default: Date.now}
});

const itineraryModel = mongoose.model("itinerary",itinerarySchema);

export default itineraryModel