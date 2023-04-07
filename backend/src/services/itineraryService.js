import groupModel from "../models/groupModel.js";
import itineraryModel from "../models/itineraryModel.js";
import userModel from "../models/userModel.js";
import openaiquery from "../utils/openai.js";
import {itineraryData} from "../utils/commonutil.js";
import itineraryItemModel from "../models/itineraryItemModel.js";


export class ItineraryService {

  generate = async (req, res) => {
    try {
      // console.log(req.body);
      const { startDate, endDate, duration, location, interests, budget, userId, itineraryId } = req.body;
      if (!duration) {
        duration = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      }
      if (!(location && duration)) {
        res.status(400).send("Mandatory fields missing");
      }
      const itineraryName = `Trip to ${location}`;
      const itineraryObject = await this.getItineraryObject(req)
      itineraryObject.itineraryName = itineraryName;
      var prompt = `Generate a ${duration}-day itinerary for a trip to ${location}. The itinerary should have a budget of ${budget} and include activities related to ${interests}.. The response should be in JSON format which includes the following fields-  Response should be in JSON format as a list of dictionaries. Each dictionary will have 2 fields - "Day"(in number) and "Places". The value places should be a list of dictionaries containing fields- "Name", "Latitude", "Longitude", "Travel time", "Popularity"(High/Medium/Low), "Description", "Category", "Cost"(in USD). Reply with only the answer in JSON form and include no other commentary.Limit the output to less than 1000 tokens.`
      // let savedItinerary = await itineraryObject.save();
          
      // res.status(200).send(savedItinerary)
      openaiquery(prompt)
        .then((itinerary) => {
          console.log(itinerary)

          itineraryObject.itineraryList = JSON.parse(itinerary)
          let savedItinerary =  itineraryObject.save();
          
          res.status(200).send(itineraryObject)
        })
        .catch((error) => {
          console.error(error)
          res.status(500).send(error)

        }
        );
     
    } catch (err) {
      // console.error(err)
      res.status(500).send(err)
    }
  };

  getItineraryObject = async(req) => {

    try {
      const { startDate, endDate, duration, location, interests, budget, userId, itineraryId } = req.body;
       const data = {

          destination: location,
          startDate: startDate,
          endDate: endDate,
          budget: budget,
          interests: interests,
          createdBy: userId,
          createdTimestamp: new Date(),
          updatedTimestamp: new Date()
      }
      const query = { _id: itineraryId}

      const itinerary = await itineraryModel.findOneAndUpdate(query, data, {upsert: true});
    
      // if (itineraryId){
      //   const itinerary = await itineraryModel.findById(itineraryId);


      //   if (itinerary) {
      //     return itinerary;
      //   }
      // }
       
  
      // const newItinerary = new itineraryModel(query);
      // console.log(newItinerary)
      return itinerary;

    
      
    } catch(e) {
      console.log(e)
      res.status(500).send(e)
    }
  }

  getItineraryById = async(itineraryId) => {
    try{
      const query = { _id: itineraryId}

      const itinerary = await itineraryModel.findOne(query);
      return itinerary
    } catch(e){
      return null
    }
  }
  getItineraryByUserId = async(req, res) => {

    try {
      const {userId } = req.body;
      
      const query = { createdBy: userId}
      console.log(query)
      const itinerary = await itineraryModel.find(query);
    
      // if (itineraryId){
      //   const itinerary = await itineraryModel.findById(itineraryId);


      //   if (itinerary) {
      //     return itinerary;
      //   }
      // }
       
  
      // const newItinerary = new itineraryModel(query);
      // console.log(newItinerary)
      res.status(200).send(itinerary)
      return itinerary;

    
      
    } catch(e) {
      console.log(e)
      res.status(500).send(e)
    }
  }
  

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