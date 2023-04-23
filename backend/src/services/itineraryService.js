import itineraryModel from "../models/itineraryModel.js";
import userModel from "../models/userModel.js";
import openaiquery from "../utils/openai.js";
import NotificationService from "./notificationService.js";

const notificationService = new NotificationService();

export class ItineraryService {

  generate = async (req, res) => {
    try {
      const { startDate, endDate, location, interests, budget, userId, itineraryId, members } = req.body;
      const endDateMs = (new Date(endDate)).getTime();
      const startDateMs = (new Date(startDate)).getTime();
      const duration = (Math.ceil((endDateMs - startDateMs) / (1000 * 3600 * 24))) + 1;
      if (!(location && duration)) {
        res.status(400).send("Mandatory fields missing");
      }

      var prompt = `Generate a ${duration}-day itinerary for a trip to ${location}. The itinerary should have a budget of ${budget} and include activities related to ${interests}.. The response should be in JSON format which includes the following fields-  Response should be in JSON format as a list of dictionaries. Each dictionary will have 2 fields - "Day"(in number) and "Places". The value places should be a list of dictionaries containing fields- "Name", "Latitude", "Longitude", "Travel time", "Popularity"(High/Medium/Low), "Description", "Category", "Cost"(in USD). Reply with only the answer in JSON form and include no other commentary.Limit the output to less than 1000 tokens.`
      console.log(prompt);

      const itinerary = await openaiquery(prompt)
      console.log(itinerary)
      const itineraryName = `Trip to ${location}`;
      const itineraryObject = {
        itineraryName: itineraryName,
        destination: location,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        interests: interests,
        modifiedBy: userId,
        itineraryList: JSON.parse(itinerary),
        createdTimestamp: new Date(),
        updatedTimestamp: new Date()
      }
      let savedItinerary
      if (itineraryId) {
        itineraryObject.members = members
        savedItinerary = await itineraryModel.findOneAndUpdate({ _id: itineraryId }, { $set: itineraryObject }, { upsert: true, new: true })
        notificationService.itineraryNotification(itineraryId, userId, "UPDATE")
      } else {
        itineraryObject.createdBy = userId;
        itineraryObject.members = [userId];
        const itinerary = new itineraryModel(itineraryObject)
        savedItinerary = await itinerary.save();
        const owner = await userModel.findOne({ _id: itineraryObject.createdBy }).select("username email")
        savedItinerary.members = [owner]
        savedItinerary.createdBy = owner
      }
      res.status(200).send(savedItinerary)

    } catch (err) {
      console.log(err);
      res.status(500).send("Unable to generate itinerary. Please try again in sometime")
    }
  };

  getItineraryById = async (req, res) => {
    try {
      const itineraryId = req.params.id;
      const query = { _id: itineraryId }

      const itinerary = await itineraryModel.findOne(query);
      const memberInfo = []
      await Promise.all(
        itinerary.members.map(async (member) => {
          const memberData = await userModel.findOne({ _id: member }).select("username email")
          memberInfo.push(memberData)
        })
      );
      const owner = await userModel.findOne({ _id: itinerary.createdBy }).select("username email")
      itinerary.members = memberInfo
      itinerary.createdBy = owner
      res.status(200).send(itinerary)
    } catch (e) {
      console.log(e);
      res.status(500).send("Unable to fetch itinerary")
    }
  }

  getItineraryByUserId = async (req, res) => {

    try {
      const { userId } = req.body;
      const query = [{ createdBy: userId }, { members: { "$in": [userId] } }]
      const itinerary = await itineraryModel.find({ $or: query });

      res.status(200).send(itinerary)
      return itinerary;
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }

  deleteItinerary = async (req, res) => {
    try {
      const { itineraryId, userId } = req.body;
      const itinerary = await itineraryModel.findById(itineraryId)
      if (!itinerary) {
        res.status(400).send("Itinerary not found")
      }
      else {
        if (userId != itinerary.createdBy) {
          res.status(401).send("Unauthorized Action")
        }
        else {
          notificationService.itineraryNotification(itineraryId, userId, "DELETE")
          await itineraryModel.deleteOne({ _id: itineraryId });
          res.status(200).send("Itinerary Deleted")
        }
      }
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }


  favoriteItinerary = async (req, res) => {
    try {
      const { itineraryId, userId, isFavorite } = req.body;
      const itinerary = await itineraryModel.findById(itineraryId)
      if (!itinerary) {
        res.status(400).send("Itinerary not found")
      }
      else {
        if (userId != itinerary.createdBy && !itinerary.members.includes(userId)) {
          res.status(401).send("Unauthorized Action")
        }
        else {
          itinerary.isFavorite = isFavorite
          const newItinerary = await itinerary.save()
          res.status(200).json(newItinerary)
        }
      }
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }

  leaveItinerary = async (req, res) => {
    try {
      let savedItinerary;
      const { itineraryId, userId } = req.body;
      const itinerary = await itineraryModel.findById(itineraryId)
      savedItinerary = itinerary
      if (!itinerary) {
        res.status(400).send("Itinerary not found")
      }
      else {
        if (userId === itinerary.createdBy) {
          res.status(403).send("Owner cannot leave itinerary")
        }
        const members = itinerary.members;
        const memIds = []
        members.forEach(member => {
          if (member.valueOf() !== userId) {
            memIds.push(member);
          }
        });
        itinerary.members = memIds
        const updatedItinerary = new itineraryModel(itinerary)
        savedItinerary = await updatedItinerary.save();
      }
      res.status(200).send(savedItinerary)

    } catch (err) {
      console.log(err);
      res.status(500).send("Unable to leave itinerary")
    }
  }

  publicItinerary = async (req, res) => {
    try {
      const { itineraryId, userId, isPublic } = req.body;
      const itinerary = await itineraryModel.findById(itineraryId)
      if (!itinerary) {
        res.status(400).send("Itinerary not found")
      }
      else {
        if (userId != itinerary.createdBy) {
          res.status(401).send("Unauthorized Action")
        }
        else {
          itinerary.isPublic = isPublic
          const newItinerary = await itinerary.save()
          res.status(200).json(newItinerary)
        }
      }
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  }

}
export default ItineraryService;