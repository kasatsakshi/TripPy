import itineraryModel from "../models/itineraryModel.js";
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
        createdBy} = req.body;
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
          type,
          stayPeriod: {
            startDate,
            endDate
          },
          createdBy,
          createdTimestamp: currentTimeStamp,
          updatedTimestamp: currentTimeStamp,
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




}
export default ItineraryService;