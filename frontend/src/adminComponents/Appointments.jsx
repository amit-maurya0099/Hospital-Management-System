import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../ContextApi'
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const Appointments = () => {
  const {appointments,getAllAppointments}=useContext(AppContext);
 
 const handleUpdateStatus=async(id,status)=>{
    try {
      
        
      const response=await axios.put(`http://localhost:4000/api/v1/appointment/status/update/${id}`,{status:status},{withCredentials:true})
       if(response.status===200){
        // console.log(response.data.appointment)
        toast.success(response.data.message);
          getAllAppointments();
        // console.log(response.data)
       }
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.message)
    }
  
 }
 const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500"; 
    case "Accepted":
      return " text-green-500"; 
    case "Rejected":  
      return "text-red-500";      
    default:
      return "";
  }
};

const handleDeleteAppointment=async(id)=>{
  try {
     const response=await axios.delete(`http://localhost:4000/api/v1/appointment/status/delete/${id}`,{withCredentials:true})
     toast.success(response.data.message)
      getAllAppointments();

  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error.response.data)
    
  }

}


  return (
    <div className='h-screen w-full  overflow-auto shadow-2xl rounded-xl p-2 bg-sky-300 bg-gradient-to-r from-white'>
      <div className='text-xl font-bold text-center underline'>Appointments</div>
      <table  className='w-full my-10'>
        <thead className='font-semibold text-lg'>
          <th>Patient</th>
          <th>Date</th>
          <th>Doctor</th>
          <th>Department</th>
          <th>Status</th>
          <th>Delete</th>
        </thead>
        <tbody>
       {
        appointments && appointments.map((appointment)=>(
           <tr className='text-center ' key={appointment._id} >
            <td>{appointment.firstName + " " + appointment.lastName}</td>
            <td>{appointment.appointment_date}</td>
            <td>{appointment.doctor.firstName + " " + appointment.doctor.lastName}</td>
            <td>{appointment.department}</td> 
            <td>
              <select className={`px-2 py-1 outline-none ${getStatusClass(appointment.status)}`}  onChange={(e)=>handleUpdateStatus(appointment._id,e.target.value)} value={appointment.status}>
               <option value="Rejected">Rejected</option> 
               <option value="Pending">Pending</option> 
               <option value="Accepted">Accepted</option> 
                </select>
              </td>
              <td className='flex justify-center text-2xl'><button onClick={()=>handleDeleteAppointment(appointment._id)}><MdDelete/></button></td>
           

           </tr>
        ))
       }
          
        </tbody>
        
      </table>
      
    </div>
  )
}

export default Appointments
