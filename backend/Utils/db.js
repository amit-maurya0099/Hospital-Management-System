import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI=process.env.MONGO_URI;

const ConnectDB=async()=>{
   try {
    await mongoose.connect(URI);
    console.log("mongoDB connected successfully")
    
   } catch (error) {
      console.log("mongoDB connection failed",error);
   }
}
export default ConnectDB; 