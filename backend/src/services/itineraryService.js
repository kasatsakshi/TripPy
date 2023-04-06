import groupModel from "../models/groupModel.js";
import itineraryModel from "../models/itineraryModel.js";
import userModel from "../models/userModel.js";
import openaiquery from "../utils/openai.js";
import {itineraryData} from "../utils/commonutil.js";
import itineraryItemModel from "../models/itineraryItemModel.js";


export class ItineraryService {

  generate = async (req, res) => {
    try {
      console.log(req.body);
      const { startDate, endDate, duration, location, interests, budget } = req.body;
      if (!duration) {
        duration = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      }
      if (!(location && duration)) {
        res.status(400).send("Mandatory fields missing");
      }

      var prompt = `Generate a ${duration}-day itinerary for a trip to ${location}. The itinerary should have a budget of ${budget} and include activities related to ${interests}.`
      openaiquery(prompt)
        .then((itinerary) => {
          console.log(itinerary)
          // try {
          //   const parser = new Parser();
          //   const csv = parser.parse(itinerary.attractions || itinerary);
          //   console.log(csv);
          // } catch (err) {
          //   console.error(err);
          // }
          res.status(200).send(itinerary)
        })
        .catch((error) => {
          console.error(error)
          res.status(500).send(error)

        });
      // itinerary = await openaiquery(prompt)
      // console.log(itinerary)
      // res.status(200).send(itinerary) 
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  };

  createItinerary = async (req, res) => {
    try {
      console.log(req.body);
      let {
        startDate, endDate, duration, destination, budget, interests,
        createdBy, memberIds} = req.body;
        if (!duration) {
          duration = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
        }
        if (!(destination && duration)) {
          res.status(400).send("Mandatory fields missing");
        }
        const currentTimeStamp = new Date();
        // TODO: Adding itinerary Items in itineraryItemModel and save it inside
        // itinerary as well as alone
        const days = Object.keys(itineraryData);
        let dcount = days.length;
        let itemIds = []
        for (let x = 0; x < dcount; x++){
          let d = days[x];
          for (let i =0 ; i < itineraryData[d].length; i++ ) {
            let c = itineraryData[d][i].category;
            if (Array.isArray(c)){
              c = c.join(',');
            }
            let p = {
              placeName: itineraryData[d][i]["place name"],
              latitude: itineraryData[d][i].latitude,
              longitude: itineraryData[d][i].longitude,
              travelTime: itineraryData[d][i]["travel time"],
              popularity: itineraryData[d][i].popularity,
              description: itineraryData[d][i].description,
              category: c,
              day: x+1
            }
            let item = new itineraryItemModel(p);
            item = await item.save();
            itemIds.push(item["_id"])
          }
        }

        const itineraryPayload = {
          destination,
          budget,
          interests,
          startDate,
          endDate,
          createdBy,
          createdTimestamp: currentTimeStamp,
          updatedTimestamp: currentTimeStamp,
          bookmarkedBy: null,
          itineraryItems: itemIds,
        }
          
        const itinerary = new itineraryModel(itineraryPayload);
        
        let savedItinerary = await itinerary.save();
        savedItinerary = await savedItinerary.populate("itineraryItems")

        res.status(200).send(savedItinerary);
        return


    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  }

  bookmarkItinerary = async (req, res) => {
    try {
      const { itineraryId, type, isBookmarked, bookmarkedBy, groupId } = req.body;
      let itinerary = await itineraryModel.findById(itineraryId);
      if (!itinerary) {
        res.status(400).send({error: "No such itinerary doesnt exist"})
      }
      if (!(type == "individual" || type == "group" )) {
        res.status(400).send({error: "Wrong Itinerary Type"})
      }
      let user, group, bookmarkedItineraries, index;
      if (type=="individual") {
        // console.log("====1==");
        user = await userModel.findById(bookmarkedBy);
        if (!user) {
          res.status(400).send({error: "No such user"});
          return
        }
        console.log("user", user);
        bookmarkedItineraries = user.bookmarkedItineraries;
        if (!bookmarkedItineraries){
          bookmarkedItineraries = []
        }
        index =  (bookmarkedItineraries && bookmarkedItineraries.length > 0) ? bookmarkedItineraries.indexOf(itineraryId): -1;
        if (!isBookmarked) {
          // TODO: Remove it from individual user and change itinerary status
          if (index > -1) { // only splice array when item is found
            bookmarkedItineraries.splice(index, 1); // 2nd parameter means remove one item only
          }
          itinerary.bookmarkedBy = null
        } else {
          if (index == -1) {
            bookmarkedItineraries.push(itineraryId);
          }
          itinerary.bookmarkedBy = bookmarkedBy;
        }
        user.bookmarkedItineraries = bookmarkedItineraries;
        user = await user.save();

      } else {
        group = await groupModel.findById(groupId);
        if (!group) {
          res.status(400).send({error: "No such group"});
        }
        bookmarkedItineraries = group.bookmarkedItineraries;
        if (!bookmarkedItineraries) {
          bookmarkedItineraries = []
        }
        index =  (bookmarkedItineraries && bookmarkedItineraries.length > 0) ? bookmarkedItineraries.indexOf(itineraryId): -1;
        if (!isBookmarked) {
          // TODO: Remove it from individual user and change itinerary status
          if (index > -1) { // only splice array when item is found
            bookmarkedItineraries.splice(index, 1); // 2nd parameter means remove one item only
          }
          itinerary.bookmarkedBy = null;
        } else {
          if (index == -1) {
            bookmarkedItineraries.push(itineraryId);
          }
          itinerary.bookmarkedBy = bookmarkedBy;
        }
        group.bookmarkedItineraries = bookmarkedItineraries;
        group = await group.save();
      }
      itinerary = await itinerary.save()
      const resObj = {
        itinerary,
        user,
        group
      }
      res.status(200).send(resObj);
      return

    } catch(err) {
      console.error(err)
    }
  }




}
export default ItineraryService;