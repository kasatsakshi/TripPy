
import itineraryModel from '../models/itineraryModel.js';
import notificationModel from '../models/notificationModel.js';
import userModel from '../models/userModel.js';

export class NotificationService {
    memberNotification = async (req) => {
        try {
            const {userId, memberId, itineraryName, action} = req;
            const user = await userModel.findOne(userId);
            if(action === 'ADD'){
                const message =   `${user.fname} ${user.lname} added you to trip: ${itineraryName}`

            } else {
                const message =   `${user.fname} ${user.lname} removed you from trip: ${itineraryName}`
            }
            const notificationPayload = {
                userId: memberId,
                message: message
            }
            const notification = new notificationModel(notificationPayload);
            const savedNotification = await notification.save();
            res.status(200).json(savedNotification);
            

        } catch(err) {
            console.log(err);
            res.status(500).send(err)
        }
    }


    addMember = async(req, res) => {
        try {

            const {itineraryId, userId, memberId} = req.body
            const query = { _id: itineraryId}

            const itinerary = await itineraryModel.findOne(query);
            if (itinerary){
                if (userId!=itinerary.createdBy){
                    res.status(401).send("Unauthorized Access")
                }
                let members = itinerary.members

                if(members.includes(memberId)){
                    res.status(201).send("Already a member")
                }
                else{
                    members.push(memberId)
                    const newItinerary = await itinerary.save()
                    res.send(200).json(newItinerary)
                }
            }
            else{
                res.send(400).send("Itinerary not found")
            }

        } catch(err) {
            console.log(err);
            res.status(500).send(err)
        }

    }
}

export default NotificationService;