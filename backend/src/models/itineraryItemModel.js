import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itineraryItemSchema = new Schema({
    day: { type: Number},
        
    placeName: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
    travelTime: {type: String},
    popularity: {type: String},
    description: {type: String},
    category: {type: String},
    });

const itineraryItemModel = mongoose.model("itineraryItem",itineraryItemSchema);

export default itineraryItemModel