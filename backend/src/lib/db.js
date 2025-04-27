
import mongoose from "mongoose"

const connectDB = async()=>{

    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected sucessfulu :) ");
    }catch(err){
        console.log("error connecting to database :( ", err);
    }
}

export default connectDB;