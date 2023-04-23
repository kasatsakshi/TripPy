import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: { type: String},
    lname: { type: String },
	username: { type: String },
    password: { type : String },
    email: { type: String },
    bookmarkedItineraries: [{type: mongoose.Schema.Types.ObjectId,
                    ref: "itinerary"}],
    image: { type: String}
});

const userModel = mongoose.model("user",userSchema);

export default userModel