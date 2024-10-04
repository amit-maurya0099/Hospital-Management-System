import { User } from "../models/userSchema.js";
import { catchAsynErrors } from "./catchAsyncError.js";
import errorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated= catchAsynErrors(async(req,res,next)=>{
   const token= req.cookies.adminToken;
   if(!token){
      return next(new errorHandler("Admin not authenticated!",401));
   }
   const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);

   req.user=await User.findById(decoded.id);
   if(req.user.role !=="Admin"){
    return next(new errorHandler(`${req.user.role} is not authorised to access this resource`,403));
   }
   next();

})

// patient authentication

export const isPatientAuthenticated= catchAsynErrors(async(req,res,next)=>{
    const token= req.cookies.patientToken;
    if(!token){
       return next(new errorHandler("patient is  not authenticated!",401));
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
 
    req.user=await User.findById(decoded.id);
   
    next();
 
 })