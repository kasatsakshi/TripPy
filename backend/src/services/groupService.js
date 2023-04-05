import * as dotenv from 'dotenv' 
dotenv.config()
// import jwt from 'jsonwebtoken';
// const tokenKey = process.env.TOKEN_KEY;
// import bcrypt from "bcryptjs";
// import userModel from '../models/userModel.js';
import groupModel from '../models/groupModel.js';

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
}

export default GroupService;