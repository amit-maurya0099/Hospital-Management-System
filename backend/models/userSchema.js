import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({
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
    nic:{
        type:String,
         minLength:[5,"NIC  must contain 5 digits"],
         maxLength:[5,"NIC  must contain 5 digits"]
    },
    dob:{
        type: Date,
        required:[true,"DOB is required!"]
    },
    gender:{
        type: String,
        required:true,
        enum:["Male","Female"]

    },
    password:{
        type:String,
        required:[true,"Passowrd is required!"],
        minLength:[8,"password must contain at least 8 characters"],
        select: false
    },
    role:{
        type:String,
        enum:["Admin","Doctor","Patient"],

    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    },
    experience:{
        type:String
    }



},{timestamps:true})


// password hashing
userSchema.pre("save", async function (next){
     const user=this;
     if(!user.isModified("password")){
        next();
     }
     try {
        user.password=await bcrypt.hash(user.password,10);
        
     } catch (error) {
        next(error);
     }
})
// compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// generate token
userSchema.methods.generateToken=async function(){
    return jwt.sign({id: this._id, email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })

}

export const User=mongoose.model("User",userSchema);