
import itineraryModel from '../models/itineraryModel.js';
import notificationModel from '../models/notificationModel.js';
import userModel from '../models/userModel.js';

export class NotificationService {
    memberNotification = async (userId, memberId, itineraryName, action) => {
        try {
            
            const user = await userModel.findById(userId);
            let message = ''
            if(action === 'ADD'){
                message =   `${user.fname} ${user.lname} added you to trip: ${itineraryName}`

            } else {
                message =   `${user.fname} ${user.lname} removed you from trip: ${itineraryName}`
            }
            const notificationPayload = {
                userId: memberId,
                message: message
            }
            const notification = new notificationModel(notificationPayload);
            const savedNotification = await notification.save();

        } catch(err) {
            console.log(err);
        }
    }

    updateNotification = async (itineraryId, userId, action) => {

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


}

export default NotificationService;