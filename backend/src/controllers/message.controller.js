import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId } from "../lib/socket.js";
import {io} from "../lib/socket.js";

const getUsersForSidebar = async (req , res) =>{

    try {
        const loggedinUserId = req.user._id;

        const filteredUsers = await User.find({_id : {$ne:loggedinUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        
        console.log("error in message controller get users for sidebar " , error);
        res.status(500).json("internal server error");
    }
}


const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user?._id;

        if (!userToChatId || !myId) {
            return res.status(400).json({ message: "User IDs missing" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: myId }
            ]
        }).sort({ createdAt: 1 }); // Optional: sort by time

        res.status(200).json(messages);

    } catch (error) {
        console.error("error in message controller getMessages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const sendMessages = async(req , res) =>{

    try {
        const {text , image} = req.body;
        const {id : reciverId} = req.params;
        const senderId = req.user._id;
        
        let imageurl;

        if(image){
            imageurl  = (await cloudinary.uploader.upload(image)).secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image : imageurl,
        })

        await newMessage.save();

        // todo : realtime functionality happens here => socket.io
        const reciverSocketId = getReciverSocketId(reciverId);

        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);


    } catch (error) {
        console.log("error in message controller send messages " , error);
        res.status(500).json("internal server error");
    }
}

export {
    getUsersForSidebar,
    getMessages,
    sendMessages
};