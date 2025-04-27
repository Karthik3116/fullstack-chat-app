import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat.karthik.top", // no array needed unless multiple origins
    credentials: true, // allow cookies/auth headers if needed
  },
});

export function getReciverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap = {};



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.auth.userId; 


  if(userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  console.log("Total Online users are " , userSocketMap)

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Total Online users are " , userSocketMap)
  });
});


export { app, server, io };
