
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


}

export default NotificationService;