import React, { useEffect, useState } from 'react'
import DoctorCard from '../DoctorCard'
import axios from 'axios'

const About = () => {
  
  const [doctors,setDoctors]=useState([])

  const getAllDoctors=async()=>{
    try {
        
      const response=await axios.get("https://hospital-management-system-v5ju.onrender.com/api/v1/user/doctors",{withCredentials:true});
      setDoctors(response.data.doctors)
    } catch (error) {
      console.log(error.response.data)
      
    }
    
  }
  useEffect(()=>{
    getAllDoctors();
  },[])
  

  return (
    <div className='bg-sky-200 bg-gradient-to-r from-white min-h-screen md:px-[10%] font-serif pt-8 '>
      <div className='md:flex shadow-2xl py-[5%] '>
        <div className='md:w-[40%] '>
          <img src="https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png" className='object-cover '></img>
        </div>
        <div className='md:w-[60%] p-4 '>
          <h1 className='text-xl font-semibold '>About MediSync Medical College</h1>
          <p className='text-lg'> 
          Our MediSync Hospital is a state-of-the-art facility equipped with modern technology, offering a wide range of specialties and services to meet the diverse needs of our patients. We strive to provide compassionate, patient-centered care while adhering to the highest standards of medical excellence. Our hospital serves as the ideal training ground for students, who gain invaluable experience working alongside top medical professionals in real-world scenarios.
          </p>
          <p className='text-lg'>
          At MediSync, we believe in giving back to the community and improving public health. We participate in numerous outreach programs, health camps, and community health initiatives, ensuring that we remain a beacon of hope and care for those in need. Our research wing is continually exploring innovative treatments, medical advancements, and breakthroughs that push the boundaries of healthcare.
          </p>
        </div>
      </div>
      <div className='my-10 '>
       <h1 className='text-2xl font-bold text-gray-600 text-center '>Our Team</h1>
       <div className='w-full flex flex-wrap justify-evenly gap-8 py-10  '>
        {doctors.map((doctor)=>(
         <DoctorCard url={doctor.docAvatar.url} name={doctor.firstName + " "+ doctor.lastName} type={doctor.doctorDepartment} experience={doctor.experience}  key={doctor._id}/>
        ))}
                    
       </div>
      </div>
      
    </div>
  )
}

export default About
