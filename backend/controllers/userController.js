import { catchAsynErrors } from "../middlewares/catchAsyncError.js";
import errorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../Utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsynErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !dob ||
    !gender ||
    !role
  ) {
    return next(new errorHandler("Please fill all the details"), 400);
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new errorHandler("User already exist with this email"), 400);
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role,
  });
  res.status(200).json({
    success: true,
    message: "user registered successfully",
  });
});

// user login
export const login = catchAsynErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new errorHandler("please fill all the sections", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("User does'nt exist! Please register", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid email or password", 400));
  }
  if (role != user.role) {
    return next(new errorHandler("user with this role is not found"));
  }
  sendToken(user, 200, `${role} Logged in Successfully`, res);
});
// add new admin

export const addNewAdmin = catchAsynErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !dob ||
    !gender
  ) {
    return next(new errorHandler("Please fill all the details"), 400);
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new errorHandler(`${isRegistered.role} already exist with this email`),
      400
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New admin registered successfully",
  });
});

// logout Admin 
export const logoutAdmin = catchAsynErrors(async (req, res, next) => {
  if (req.cookies.adminToken) {
    res.cookie("adminToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure:true,
      sameSite:"None"
      

    });
  }

  
    res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  
});


// logout patient
export const logoutPatient= catchAsynErrors(async(req,res,next)=>{
  if(req.cookies.patientToken){
    res.cookie("patientToken",null,{expires:new Date(Date.now()), httpOnly:true,
    secure:true,
    sameSite:"None"  

    })
    res.status(200).json({
      success: true,
      message: "Patient logged out successfully"
    });
  
  }
})

// get all doctors

export const getAllDoctors = catchAsynErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// get user details

export const getUserDetails = catchAsynErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// add new doctor

 export const addNewDoctor=catchAsynErrors(async (req,res,next)=>{
  // if(!req.files || Object.keys(req.files).length === 0){
  //   return next(new errorHandler("Doctor Avatar required",400));
  // }  

  const {docAvatar}=req.files;

  const allowedFormats=["image/png", "image/jpeg", "image/webp"];
  if(!allowedFormats.includes(docAvatar.mimetype)){
    return next(new errorHandler("File format not supported"),400);
    
  }

  const {firstName, lastName, email, phone, password, gender, dob,doctorDepartment,experience }=req.body;

  if (!firstName || !lastName ||  !email || !phone ||  !password ||  !dob || !gender || !doctorDepartment,!experience ) {
    return next(new errorHandler("Please provide all the details"), 400);
  }
  
  const isRegistered=await User.findOne({email});
  if(isRegistered){
    return next(new errorHandler(`${isRegistered.role} is already registered with this email`),400);
  }
   
     const myCloud=await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);
     
     if(!myCloud || myCloud.error){
         console.log("Cloudinary error: ", myCloud.error)
     }

  const doctor=await User.create({firstName, lastName, email, phone, password, gender, dob,doctorDepartment,experience,
       role:"Doctor",
       docAvatar:{
        public_id: myCloud.public_id,
              url: myCloud.secure_url
       }

  })
   res.status(200).json({
      success:true,
      message:"New doctor registered successfully"
   })

 })
