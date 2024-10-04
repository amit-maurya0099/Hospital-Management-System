import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"first name must contain at least 3 characters "]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"last name must contain at least 3 characters "]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'please enter a valid email']
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"phone number must contain 10 digits"],
        maxLength:[10,"phone number must contain 10 digits"]

    },
    message:{
        type:String,
         required:true,
         minLength:[10,"message must be of at least 10 characters"]
    }

})

export const Message=mongoose.model("Message",messageSchema)