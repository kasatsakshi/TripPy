import express from "express";
import GroupService from "../services/groupService.js";

const groupRouter = express.Router();
const groupService = new GroupService();

groupRouter.post("/createGroup", groupService.createGroup);
groupRouter.post("/group/member/add", groupService.addMember)

export default groupRouter;