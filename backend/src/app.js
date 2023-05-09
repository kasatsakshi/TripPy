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

let onlineSocketUsers = [];

const addSocketUser = (username, socketId) => {
  !onlineSocketUsers.some((user) => user.username === username) &&
    onlineSocketUsers.push({ username, socketId });
};

const removeSocketUser = (socketId) => {
  onlineSocketUsers = onlineSocketUsers.filter((user) => user.socketId !== socketId);
};

const getSocketUser = (username) => {
  return onlineSocketUsers.find((user) => user.username === username);
};

io.on('connect', function (socket) {
  socket.on("newSocketUser", (username) => {
    addSocketUser(username, socket.id);
    io.emit("socketUserInfo", socket.id);
  });


  socket.on("requestNotifications", async ({ senderName }) => {
    const receiver = getSocketUser(senderName);
    const notifications = await notificationModel.find({ userId: senderName }).sort({ timestamp: -1 })
    io.to(receiver.socketId).emit("getNotifications", notifications);
  });


  socket.on("disconnect", () => {
    removeSocketUser(socket.id);
  });
});

io.listen(5001);

export default app;