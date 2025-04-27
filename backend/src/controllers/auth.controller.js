
import cloudinary from "../lib/cloudinary.js";
import genToken from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const signup = async (req , res) =>{
    
    const {fullName , email , password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message : "all fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message : "password mush have atleast 6 characters"});
        }
        
        const user = await User.findOne({email});
        
        if(user) return res.status(400).json({message : "user already exists with this email"});
        
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password , salt);
        
        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashPass
        })

        // res.json(newUser);

        if(newUser){
            genToken(newUser._id , res);
            await newUser.save();
            res.status(201).json({message : newUser});
            
        }else{
            res.status(400).json({message : "invalid user data"});   
        }

    } catch (error) {
        console.log("error happend", error);
        res.status(500).json({message : error});   
    }
}

const login = async (req,res)=>{

    const {email , password} = req.body;
    try {
        const user = await User.findOne({email});
        // console.log("user is :- ",user)
        if(!user){
            return res.status(404).json({message : "invalid credentials "});
        }

        const ispass_correct = await bcrypt.compare(password,user.password);

        if(!ispass_correct){
            return res.status(404).json({message : "invalid credentials "});
        }

        genToken(user._id, res);

        res.status(200).json({message : "logged in successfully " , user})

    } catch (error) {
        console.log("error in login auth.controller.js" , error);
        res.status(500).json({message : "internal server error"});

    }
}

const logout = (req,res)=>{

    try {
        
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({message : "logged out successfully "})

    } catch (error) {
        console.log("error in logout controller " , error.message)
        res.status(500).json({message : "internal server error"});
    }
}


const updateProfile = async(req , res) =>{

    try {
        
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message : "Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId ,
            {profilePic : uploadResponse.secure_url},
            {new:true}
        );

        res.status(200).json({updatedUser})

    } catch (error) {
        console.log("error in auth controller update profile " , error.message);
        res.status(500).json({message:"internal server error "});
    }
};


const checkAuth = (req , res) =>{

    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("error in auth controller checkAuth " , error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
}

