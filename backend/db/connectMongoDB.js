import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export default async function connectMongoDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB Connected");
    } catch (error) {
        console.log("Error connecting to monogoDB: ", error.message);
    }
}