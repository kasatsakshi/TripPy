import express from "express";
import GroupService from "../services/groupService.js";

const groupRouter = express.Router();
const groupService = new GroupService();

groupRouter.post("/createGroup", groupService.createGroup);

export default groupRouter;