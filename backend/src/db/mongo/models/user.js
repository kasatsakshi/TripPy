const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: { type: String},
    lname: { type: String },
	username: { type: String },
    password: { type : String },
    email: { type: String },
});

const userModel = mongoose.model("user",userSchema);

module.exports =userModel;