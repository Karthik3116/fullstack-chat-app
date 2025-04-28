import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must have at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.log("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Logged in successfully", user });

    } catch (error) {
        console.log("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = (req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { email, profilePic } = req.body;

        if (!email || !profilePic) {
            return res.status(400).json({ message: "Email and profile picture are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        user.profilePic = uploadResponse.secure_url;
        await user.save();

        res.status(200).json({ message: "Profile updated", user });

    } catch (error) {
        console.log("Error in updateProfile:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkAuth = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.log("Error in checkAuth:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
};
