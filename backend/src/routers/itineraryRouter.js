import express from "express";
import ItineraryService from "../services/itineraryService.js";

const itineraryRouter = express.Router();
const itineraryService = new ItineraryService();

itineraryRouter.post("/itinerary/generate", itineraryService.generate);
// itineraryRouter.post("/itinerary", itineraryService.createItinerary);
itineraryRouter.get("/itinerary/user", itineraryService.getItineraryByUserId);
itineraryRouter.delete("/itinerary/delete", itineraryService.deleteItinerary);
itineraryRouter.put('/itinerary/favorite', itineraryService.favoriteItinerary);
itineraryRouter.put('/itinerary/public', itineraryService.publicItinerary);
itineraryRouter.post("/itinerary/leaveItinerary", itineraryService.leaveItinerary);
itineraryRouter.get("/itinerary/similar", itineraryService.getPublicItinerary);
itineraryRouter.get("/itinerary/:id", itineraryService.getItineraryById);
// itineraryRouter.put("/itinerary/bookmark", itineraryService.bookmarkItinerary);

export default itineraryRouter;