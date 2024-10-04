import { catchAsynErrors } from "../middlewares/catchAsyncError.js"
import errorHandler from "../middlewares/errorMiddleware.js"
import { Appointment } from "../models/appointmentSchema.js"
import { User } from "../models/userSchema.js"


export const bookAppointment=catchAsynErrors(async(req,res,next)=>{
    const {firstName,lastName,email,gender,dob,phone,department,appointment_date,doctor_firstName,doctor_lastName,address}=req.body;
     
    if(!firstName || !lastName || !email  || !gender || !dob || !phone || !department || !appointment_date || !doctor_firstName || !doctor_lastName || !address){
        return next(new errorHandler("please fill all the details"),400);
       } 

       const isConflict=await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
       })
       if(isConflict.length === 0){
        return next(new errorHandler("Doctor not found"),400);
       }
       if(isConflict.length>1){
        return next(new errorHandler("Doctors conflict, please contact through email or phone ",404))
       }
    const doctorId=isConflict[0]._id;
    const patientId=req.user

    const appointment =await Appointment.create({firstName,lastName,email,gender,dob,phone,department,appointment_date,address,doctorId,patientId,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName
        }
    })

    res.status(200).json({
        success:true,
        message:"appointment booked successfully",
        appointment
    })

})


export const getAllAppointments=catchAsynErrors(async(req,res,next)=>{
        const appointments=await Appointment.find();
        res.status(200).json({
            success:true,
            message:"appointments retrieved successfully ",
            appointments
        })
})

export const updateAppointmentStatus=catchAsynErrors(async(req,res,next)=>{
      const  {id}= req.params;
      
      let appointment=await Appointment.findById(id);
      
      if(!appointment){
        return next(new errorHandler("appointment not found",404));
      }
      appointment=await Appointment.findByIdAndUpdate(id, {status:req.body.status},{new:true,runValidators:true})
      res.status(200).json({
        success:true,
        message:"appointment status updated",
        appointment
      })
})

export const deleteAppointment=catchAsynErrors(async(req,res,next)=>{
      const {id}=req.params;

      const appointment=await Appointment.findById(id);
      if(!appointment){
        return next(new errorHandler("appointment not found",404));
      }
      await appointment.deleteOne();
      res.status(200).json({
        success:true,
        message:"appointment deleted successfully"
      })

})
// get appointment history
export const getAppointmentsByEmail=async(req,res,next)=>{
   const user=req.user;
   
   const appointments=await Appointment.find({email:user.email})
     res.status(200).json({
      success:true,
      appointments
     })

}