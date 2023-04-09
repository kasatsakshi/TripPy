import express from "express";
import NotificationService from "../services/notificationService.js";

const notificationRouter = express.Router();
const notificationService = new NotificationService();

notificationRouter.get("/notification", notificationService.getNotifications);
notificationRouter.put("/notification", notificationService.readNotification);
notificationRouter.delete("/notification", notificationService.deleteNotification);

export default notificationRouter;