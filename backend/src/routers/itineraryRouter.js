import express from "express";
import ItineraryService from "../services/itineraryService.js";

const itineraryRouter = express.Router();
const itineraryService = new ItineraryService();

itineraryRouter.post("/itinerary/generate", itineraryService.generate);

export default itineraryRouter;