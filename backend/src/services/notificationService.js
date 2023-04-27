
import itineraryModel from '../models/itineraryModel.js';
import notificationModel from '../models/notificationModel.js';
import userModel from '../models/userModel.js';

export class NotificationService {

    memberNotification = async (userId, members, itineraryName, action) => {
        try {
            
            const user = await userModel.findById(userId);
            let message = ''
      
            if(action === 'ADD'){
                message =   `${user.fname} ${user.lname} added you to trip: ${itineraryName}`

            } else {
                message =   `${user.fname} ${user.lname} removed you from trip: ${itineraryName}`
            }

            let notificationList = []
            for (const member of members){
                notificationList.push({
                    userId : member, message: message
                })
            }
            await notificationModel.insertMany(notificationList);         

        } catch(err) {
            console.log(err);
        }
    }

    itineraryNotification = async (itineraryId, userId, action) => {

        try {

            const itinerary = await itineraryModel.findById(itineraryId);
            const user = await userModel.findById(userId);
            let message = `${user.fname} ${user.lname} ${action.toLowerCase()}d ${itinerary.itineraryName}`
 
            let members = itinerary.members
            members.push(itinerary.createdBy)
            members.splice(members.indexOf(userId), 1)
            let notificationList = []
            for (const member of members){
                notificationList.push({
                    userId : member, message: message
                })
            }
            await notificationModel.insertMany(notificationList);
        } catch(err) {
            console.log(err);
        }
    }

    readNotification = async (req, res) => {

        try {
            let notification = await notificationModel.findById(req.body.notificationId)
            notification.isRead=true
            await notification.save()
            res.status(200).json(notification)

        } catch(err) {
            console.log(err);
            res.status(500).send(err)

        }
    }

    deleteNotification = async (req, res) => {

        try {

            await notificationModel.deleteOne({_id: req.body.notificationId});
            res.status(200).send("Notification Deleted")

        } catch(err) {
            console.log(err);
            res.status(500).send(err)

        }
    }

    getNotifications = async(req, res) => {
        try{
            const notifications = await notificationModel.find({userId: req.body.userId})
            res.status(200).json(notifications)
        } catch(err) {
            console.log(err);
            res.status(500).send(err)
        }
       
    } 
}

export default NotificationService;