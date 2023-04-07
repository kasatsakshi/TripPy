import * as dotenv from 'dotenv' 
dotenv.config()
// import jwt from 'jsonwebtoken';
// const tokenKey = process.env.TOKEN_KEY;
// import bcrypt from "bcryptjs";
// import userModel from '../models/userModel.js';
import groupModel from '../models/groupModel.js';
import itineraryModel from '../models/itineraryModel.js';
import { NotificationService } from './notificationService.js';

const notificationService = new NotificationService();

export class GroupService {
    createGroup = async (req, res) => {
        try {
            console.log(req.body);
            const {groupName, members, createdBy} = req.body;
            let memIds = [];
            console.log(createdBy);
            memIds.push(createdBy);
            // TODO: On Frontend-Check if All members are registered with Trippy.
            members.forEach(member => {
                memIds.push(member?.id);
            });
            // console.log(memIds);
            const groupPayload = {
                groupName,
                members: memIds,
                createdBy,
                bookmarkedItineraries: [],
            }
            console.log(groupPayload);
            const group = new groupModel(groupPayload);
            const savedGroup = await group.save();
            res.status(200).json(savedGroup);
            return

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
                    await notificationService.memberNotification(userId,memberId, itineraryName, action="ADD")
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

export default GroupService;