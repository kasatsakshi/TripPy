import express from "express";
import UserService from "../services/userService.js";

const userRouter = express.Router();
const userService = new UserService();

userRouter.get("/user/login", userService.login);
userRouter.post("/user/signup", userService.signup)

export default userRouter;