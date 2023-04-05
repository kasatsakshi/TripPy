import groupModel from "../models/groupModel.js";
import itineraryModel from "../models/itineraryModel.js";
import userModel from "../models/userModel.js";
import openaiquery from "../utils/openai.js";
// import 'csv-writer';
// import { Parser } from '@json2csv/plainjs';

export class ItineraryService {

  generate = async (req, res) => {
    try {
      console.log(req.body);
      const { startDate, endDate, duration, location, interests, budget, season } = req.body;
      if (!duration) {
        duration = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      }
      if (!(location && duration)) {
        res.status(400).send("Mandatory fields missing");
      }

      // const { location} = req.body;

      var prompt = `Generate a ${duration}-day itinerary for a trip to ${location}. The itinerary should have a budget of ${budget} and include activities related to ${interests}.`
      // var prompt = `Generate a 2-day itinerary for a trip to ${location}.`
      // let prompt = `provide information about top 3 tourist attractions in ${location} in JSON format. Details to be included are name of the place, latitude, longitude, location category, travel time, description and popularity`
      // console.log(prompt)
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
        startDate, endDate, duration, type, destination, budget, interests,
        createdBy, groupId} = req.body;
        if (!duration) {
          duration = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
        }
        console.log("duration:", duration);
        if (!(destination && duration)) {
          res.status(400).send("Mandatory fields missing");
        }
        const currentTimeStamp = new Date();
        // TODO: Adding itinerary Items in itineraryItemModel and save it inside
        // itinerary as well as alone
        const itineraryPayload = {
          destination,
          budget,
          interests,
          // type, No type in the itinerary model
          stayPeriod: {
            startDate,
            endDate
          },
          createdBy,
          createdTimestamp: currentTimeStamp,
          updatedTimestamp: currentTimeStamp,
          bookmarkedBy: null,
        }

        const itinerary = new itineraryModel(itineraryPayload);
        const savedItinerary = await itinerary.save();

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
          // console.log("====2==");
          // TODO: Remove it from individual user and change itinerary status
          if (index > -1) { // only splice array when item is found
            // console.log("====3==");
            bookmarkedItineraries.splice(index, 1); // 2nd parameter means remove one item only
          }
          itinerary.bookmarkedBy = null
        } else {
          // console.log("====4==", bookmarkedItineraries);
          if (index == -1) {
            // console.log("====5==");
            bookmarkedItineraries.push(itineraryId);
          }
          itinerary.bookmarkedBy = bookmarkedBy;
        }
        // console.log("====6==");
        user.bookmarkedItineraries = bookmarkedItineraries;
        user = await user.save();

      } else {
        // console.log("====7==");
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
          // console.log("====8==");
          // TODO: Remove it from individual user and change itinerary status
          if (index > -1) { // only splice array when item is found
            bookmarkedItineraries.splice(index, 1); // 2nd parameter means remove one item only
          }
          itinerary.bookmarkedBy = null;
        } else {
          // console.log("====9==");
          if (index == -1) {
            bookmarkedItineraries.push(itineraryId);
          }
          itinerary.bookmarkedBy = bookmarkedBy;
        }
        // console.log("bookmarkedItineraries:", bookmarkedItineraries);
        group.bookmarkedItineraries = bookmarkedItineraries;
        group = await group.save();
        // console.log("savedgroup", group);
      }
      itinerary = await itinerary.save()
      const resObj = {
        itinerary,
        user,
        group
      }
      // console.log("====10==", resObj);
      res.status(200).send(resObj);
      return

    } catch(err) {
      console.error(err)
    }
  }




}
export default ItineraryService;