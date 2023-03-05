import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itineraryItemSchema = new Schema({
    day: { type: Number},
    time: {
        startTime: {type: Date },
        endTime: {type: Date}
    },
	place: { type: String },
    category: {type: String,
                enum: ['entertainment', 'heritage', 'beach']} //to be discussed
        
    });

const itineraryItemModel = mongoose.model("itineraryItem",itineraryItemSchema);

module.exports =itineraryItemModel;

export default itineraryItemModel