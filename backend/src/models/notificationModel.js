import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
        ref: "user"},
    message: {type: String},
    timestamp: {type: Date,
                default:Date.now},
    isRead: {type: Boolean,
            default: false}
   
});

const notificationModel = mongoose.model("notification",notificationSchema);

export default notificationModel