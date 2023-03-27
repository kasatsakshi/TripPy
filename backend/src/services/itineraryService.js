import openaiquery from "../utils/openai.js";

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

      var prompt = `Generate a ${duration}-day itinerary for a trip to ${location}. The itinerary should have a budget of ${budget} and include activities related to ${interests}.`


      openaiquery(prompt)
        .then((itinerary) => {
          console.log(itinerary)
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
      res.status(500).send(err)
    }
  };




}
export default ItineraryService;