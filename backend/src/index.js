// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.route.js";
// import messageRouts from "./routes/message.route.js"
// import connectDB from "./lib/db.js";
// import { app , server, io} from "./lib/socket.js";
// import path from "path";


// dotenv.config();



// const PORT = process.env.PORT;

// const __dirname = path.resolve();

// app.use(express.json({limit:'10mb'}));
// app.use(express.urlencoded({limit:'10mb',extended:true}));

// app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

// app.use("/api/auth" , authRoutes);
// app.use("/api/messages" , messageRouts);
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")));
//     app.get("*",(req,res) =>{
//         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//     })
// }

// server.listen(5001 , ()=>{
//     console.log("IO Server is running on port : " + PORT);
//     connectDB();
// })



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRouts from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import { app, server, io } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", //client url
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRouts);

// Log all registered routes before starting the server


connectDB();
console.log("🚀 DB Connected ");
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("/*splat", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// export default app; 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(PORT || 5001, () => {
  console.log("IO Server is running on port : " + (PORT || 5001));
});