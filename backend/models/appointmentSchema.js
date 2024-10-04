import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({
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
    gender:{
        type: String,
        required:true,
        enum:["Male","Female"]

    },
    dob:{
        type: Date,
        required:[true,"DOB is required!"]
    },
    appointment_date:{
        type:String,
        required:true,  
    },
    department:{
        type:String,
        required:true
    },
    doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }

})
 
export const Appointment= mongoose.model("Appointment",appointmentSchema); 


