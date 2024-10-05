import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DoctorCard from '../DoctorCard';
import AddDoctorForm from './AddDoctorForm';
import { AppContext } from '../ContextApi';
import Loader from '../Loader';

const Doctors = () => {
  const [doctors,setDoctors]=useState([]);
  const {isFormOpen,setFormOpen,loading,setLoading}=useContext(AppContext)
  const getAllDoctors=async()=>{
    try {
        setLoading(true);
      const response=await axios.get("https://hospital-management-system-v5ju.onrender.com/api/v1/user/doctors",{withCredentials:true});
      setDoctors(response.data.doctors)
    } catch (error) {
      console.log(error.response)
      setLoading(false);
    }
    setLoading(false);
  }
  useEffect(()=>{
   getAllDoctors();
  },[!isFormOpen])
  return (
    <>
     
    <div className='w-full min-h-screen p-10  font-serif bg-sky-300 bg-gradient-to-r from-white rounded-xl shadow-xl'>
     
      <div className='flex justify-between px-10'>
      <h1 className='text-xl font-bold text-center underline'>Our Doctors</h1>
      <button className='font-lg px-2 py-1 bg-white ' onClick={()=>setFormOpen(true)}>  Add New Doctor</button>
      </div>
      {isFormOpen ?   <AddDoctorForm/> :
      <div className='mt-4 h-screen flex justify-evenly flex-wrap overflow-auto'>
        {doctors && doctors.map((doctor)=>(
          <DoctorCard url={doctor.docAvatar.url} name={doctor.firstName + " "+ doctor.lastName} type={doctor.doctorDepartment} experience={doctor.experience}  key={doctor._id}/>
        ))}
      </div>
      }
      


      
    </div>

  </>
  )
}

export default Doctors
