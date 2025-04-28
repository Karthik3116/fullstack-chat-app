import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat.karthik.top",
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

export function getReciverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.auth?.userId; // safer: optional chaining

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped userId ${userId} to socketId ${socket.id}`);
  }

  // Always emit current online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("Current Online Users:", userSocketMap);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId];
      console.log(`Removed userId ${userId} from userSocketMap`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Updated Online Users:", userSocketMap);
  });
});

export { app, server, io };
