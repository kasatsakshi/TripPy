import express from "express";
import UserService from "../services/userService.js";

const userRouter = express.Router();
const userService = new UserService();

userRouter.post("/user/login", userService.login);
userRouter.post("/user/signup", userService.signup);
userRouter.post("/user/email", userService.findUserByEmail);

export default userRouter;