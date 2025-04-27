
import mongoose from "mongoose"

const connectDB = async()=>{

    try{
        const connect = await mongoose.connect("mongodb+srv://karthik3116k:SDTo3NAOVYvHakrm@cluster0.edbxe4c.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0")
        console.log("database connected sucessfulu :) ");
    }catch(err){
        console.log("error connecting to database :( ", err);
    }
}

export default connectDB;