import React, { useContext, useEffect, useState } from 'react'
import Lottie from "react-lottie"
import appointmentAnimation from "../json/appointmentAnimation.json"
import axios from "axios"
import { toast } from 'react-toastify'
import { AppContext } from '../ContextApi'
const Appointment = () => {
  const {loading,setLoading,isAuthenticated}=useContext(AppContext);
  const [appointments,setAppointments]=useState([]);
  const [user,setUser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    gender:"",
    dob:"",
    doctor_firstName:"",
    doctor_lastName:"",
    appointment_date:"",
    department:"",
    address:""


  });

  const defaultOptionsAppointment={
         autoplay:true,
         loop:true,
         animationData:appointmentAnimation,
         rendererSetting:{
          preserveAspectRatio: 'xMidYmid slice'
         }
  }

  const appointmentDataChange=async(e)=>{
    let name=e.target.name;
    let value=e.target.value;
     setUser({
       ...user,
       [name]:value
     }) 
    

  }

   const handleFormSubmit=async(e)=>{
          e.preventDefault();
          const {firstName,lastName,email,phone,dob,address,appointment_date,department,doctor_firstName,doctor_lastName,gender}=user;
          console.log(user);
          const myForm=new FormData();
          myForm.set("firstName",firstName)
          myForm.set("lastName",lastName)
          myForm.set("email",email)
          myForm.set("phone",phone)
          myForm.set("dob",dob)
          myForm.set("gender",gender)
          myForm.set("appointment_date",appointment_date)
          myForm.set("department",department)
          myForm.set("address",address)
          myForm.set("doctor_firstName",doctor_firstName)
          myForm.set("doctor_lastName",doctor_lastName)

          try {
            setLoading(true);
            const response=await axios.post("https://hospital-management-system-v5ju.onrender.com/api/v1/appointment/book",myForm,{withCredentials:true}
            
            )
            
            if(response.status===200){
              toast.success(response.data.message);
              setUser({
                firstName:"",
                lastName:"",
                email:"",
                phone:"",
                gender:"",
                dob:"",
                doctor_firstName:"",
                doctor_lastName:"",
                appointment_date:"",
                department:"",
                address:""
            
              })

            }
            setLoading(false);
          } catch (error) {
            console.log(error.response.data);
            setLoading(false);
            toast.error(error.response.data.message);
            
          }
          

   }

   const getAppointmentHistory=async()=>{
      try {
        setLoading(false);
        const response=await axios.get("https://hospital-management-system-v5ju.onrender.com/api/v1/appointment/details/email",{withCredentials:true})
        setAppointments(response.data.appointments);
        
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
        
      }
   }
   useEffect(()=>{
    getAppointmentHistory();
   },[])

  return (
    
    <div className='bg-sky-200 bg-gradient-to-r from-white min-h-screen w-full pt-2 pb-10  md:px-[10%] font-serif'>
      
      <div className='md:flex w-full justify-between mt-16 px-4'>
        <div className=' w-full md:w-[40%] '>
          <h1 className='text-3xl font-bold '>Schedule Your Appointment Now | MediSync Medical Institute</h1>
          <p className='mt-8'>MediSync Medical Institute is a state of the art facility dedicated to provide comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is commited to delivering personalised care tailored to each patient's needs. At MediSync, we prioritize your well being, ensuring a harmonious journey towards optimal health and wellness.</p>
        </div> 
        <div className='w-full md:w-[50%]  '>
             <Lottie options={defaultOptionsAppointment}/>
        </div>
      </div>
      <div className='mt-20 px-4 shadow-2xl rounded-xl py-4'>
        <h1 className='text-gray-500 text-2xl font-bold'>Book an Appointment </h1>
        <form  onSubmit={handleFormSubmit}>
        <div className='grid grid-cols-1 gap-4 md:flex md:justify-between  my-8'>
                <input 
                className='w-[100%] md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='First Name'
                name="firstName"
                value={user.firstName}
                onChange={appointmentDataChange}
                ></input>
                <input
                className=' w-[100%] md:w-[40%] border border-gray-700 bg-slate-100 pl-2 py-1'
                placeholder='Last Name'
                name="lastName"
                value={user.lastName}
                onChange={appointmentDataChange}
                ></input>
            </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between  my-8'>
                <input 
                className='w-full md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='Email'
                name="email"
                value={user.email}
                onChange={appointmentDataChange}
                ></input>
                <input 
                className='w-full md:w-[40%] border border-gray-700 bg-slate-100 pl-2 py-1'
                placeholder='Mobile Number'
                name="phone"
                value={user.phone}
                onChange={appointmentDataChange}
                ></input>
            </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between my-4'>
                <input 
                className='w-full md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder="Doctor's First Name"
                name="doctor_firstName"
                value={user.doctor_firstName}
                onChange={appointmentDataChange}

                ></input>
                <input 
                className='w-full md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder="Doctor's Last Name"
                name="doctor_lastName"
                value={user.doctor_lastName}
                onChange={appointmentDataChange}
                ></input> 
             </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between  md:my-8'>
              <div>
                <label htmlFor="appointment_date" className='text-lg'>Appointment Date :</label>
                <input type="date" className='py-1 px-4 ml-6' name="appointment_date" value={user.appointment_date} onChange={appointmentDataChange}></input>
              </div>
              <div className='py-1 w-full md:w-[40%]'>
                <label htmlFor="department" className='text-lg '>Department: </label>
                <select name="department" className='text-lg py-1 px-2 ' onChange={appointmentDataChange}>
                 <option value="">Select department</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Nrthopedics">Orthopedics</option>
                  <option value="ENT">ENT</option>

                 
                </select>
                </div>

              </div> 
              <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between  md:my-8'>
              <div >
                <label htmlFor="dob" className='text-lg'>DOB :</label>
                <input name="dob" type="date" className='py-1 px-4 ml-6' onChange={appointmentDataChange} value={user.dob}></input>
              </div>
             
                <div className='py-1 md:w-[40%] w-full '>
                <label htmlFor="gender" className='text-lg '>Gender : </label>
                <select name="gender" className='text-lg py-1 px-4' value={user.gender} onChange={appointmentDataChange}>
                 <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                </div>
              
              </div>
              <textarea placeholder='write your full address here...' className='w-full md:w-[30%] border border-gray-700  text-black bg-slate-100 pl-2 pt- mt-2' name="address" value={user.address} onChange={appointmentDataChange}></textarea>
        
        <div className='flex justify-center mt-4'>
        <button className=" text-xl px-4 py-1 bg-sky-500 text-white rounded-xl" type="submit">Submit</button>
        </div>
       
        </form>
      </div>
      {isAuthenticated && appointments.length!==0 && <div className='my-8 border-t-2 pt-4 border-black' >
        <h1 className='text-center text-xl font-semibold underline'>Appointment History</h1>
        <div className='mt-8'>
          <table className='w-full' >
            <thead className='text-lg font-semibold bg-white ' >
              <th>Name</th>
              <th>Doctor's Name</th>
              <th>Department</th>
              <th>Appointment Date</th>
              <th>Status</th>
              
            </thead>
            <tbody >
              {appointments && appointments.map((appointment)=>(
                <tr className='text-center '>
                  <td>{appointment.firstName + " " + appointment.lastName}</td>
                  <td>{appointment.doctor.firstName + " " + appointment.doctor.lastName}</td>
                  <td>{appointment.department }</td>
                  <td>{appointment.appointment_date }</td>
                  <td>{appointment.status }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }
      
    </div>
  )
}

export default Appointment
