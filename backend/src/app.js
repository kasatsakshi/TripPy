import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import notificationModel from './models/notificationModel.js';

const app = express();
const corsOptions = { origin: '*', exposedHeaders: 'X-Auth-Token' };

app.use(cors(corsOptions));
app.use(cookieParser());
const port = 3001;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(port, () => console.log("[backend] listening on port " + port));

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on('connect', function (socket) {
  socket.on("requestNotifications", async (data) => {
    const notifications = await notificationModel.find({ userId: data }).sort({ timestamp: -1 })
    io.emit("getNotifications", notifications);
  });
});


io.listen(5001);

export default app



