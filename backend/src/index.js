
import getConnection from './dbconfig/config.js';
import app from "./app.js";
import userRouter from "./routers/userRouter.js";
// import groupRouter from "./routers/groupRouter.js";

getConnection();

app.use(userRouter);
// app.use(groupRouter);