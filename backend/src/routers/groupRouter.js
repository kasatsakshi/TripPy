import express from "express";
import GroupService from "../services/groupService.js";

const groupRouter = express.Router();
const groupService = new GroupService();

groupRouter.post("/group/create", groupService.createGroup);
groupRouter.post("/group/editmember", groupService.editMember)

export default groupRouter;