import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itineraryItemSchema = new Schema({
    Day: { type: Number},
    Places: [{
        Name: {type: String},
        Latitude:{type: Number},
        Longitude:{type: Number},
        Popularity:{type: String},
        Description: {type: String},
        Category: {type: String},
        Cost: {type: Number}
    }]   
    });

const itineraryItemModel = mongoose.model("itineraryItem",itineraryItemSchema);


export default itineraryItemModel