import { catchAsynErrors } from "../middlewares/catchAsyncError.js";
import errorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messaageSchema.js";

export const sendMessage = catchAsynErrors( async(req,res,next)=>{
    const {firstName,lastName,phone,email,message}=req.body;
    
        if(!firstName || !lastName || !email || !phone || !message){
           return next(new errorHandler("Please fill all the details",400));
        }
        await Message.create({firstName,lastName,email,phone,message});
        res.status(200).json({
            success:true,
            message:"message sent successfully"
        })
        
    
});

export const getAllMessages=catchAsynErrors(async(req,res,next)=>{

      const messages=await Message.find();
      res.status(200).json({
        success:true,
        messages
    })

})
