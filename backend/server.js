import express, { urlencoded } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import ConnectDB from "./Utils/db.js";
import cloudinary from "cloudinary";
import messageRoute from "./routers/messageRoute.js"
import userRoute from "./routers/userRoute.js"
import appointmentRoute from "./routers/appointmentRoute.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js"

const port=process.env.PORT;
dotenv.config();
const app=express();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDNINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/v1/message",messageRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/appointment",appointmentRoute);




ConnectDB().then(()=>{
   const server = app.listen(port,()=>{
        console.log(`Server is running on port : ${port}`);
      })
})
app.use(errorMiddleware);
