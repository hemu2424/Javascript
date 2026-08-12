import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected mongodb")
    }catch(error){
        console.log("error to connect",error)
        process.exit(1)
    }
}