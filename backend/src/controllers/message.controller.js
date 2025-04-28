import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId, io } from "../lib/socket.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const { userId } = req.query;

        if (!userId || !userToChatId) {
            return res.status(400).json({ message: "userId and userToChatId are required" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: userId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: userId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const sendMessages = async (req, res) => {
    try {
        const { text, image, senderId } = req.body;
        const { id: reciverId } = req.params;

        if (!senderId || !reciverId) {
            return res.status(400).json({ message: "senderId and reciverId are required" });
        }

        let imageUrl;

        if (image) {
            imageUrl = (await cloudinary.uploader.upload(image)).secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // real-time: socket.io notification
        const reciverSocketId = getReciverSocketId(reciverId);

        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    getUsersForSidebar,
    getMessages,
    sendMessages
};
