import React, { useContext, useState } from 'react'
import Lottie from 'react-lottie';
import hospitalAnimation from "./json/hospitalAnimation.json"
import homeAnimation from "./json/homeAnimation.json"
import Card from './Card';
import MessageForm from './MessageForm';
import { AppContext } from './ContextApi';
import Loader from './Loader';


const Body = () => {
    const {loading,setLoading}=useContext(AppContext);
    
    const defaultOptionsHospital={
        autoplay:true,
        loop:true,
        animationData:hospitalAnimation,
        rendererSettings:{
            preserveAspectRatio:'XMidYMid slice'
        }
    }
    const defaultOptionsHome={
        autoplay:true,
        loop:true,
        animationData:homeAnimation,
        rendererSettings:{
            preserveAspectRatio:'xMidYMid slice'
        }
    }
  return (
    <>
    
    <div className="bg-sky-200 bg-gradient-to-r from-white min-h-screen w-full pt-2  md:px-[10%] font-serif ">
    
       <div className='md:flex justify-between md:pt-20'>
        <div className='md:w-[30%] px-4'>
            <p className='text-3xl font-bold'>Welcome to MediSync Medical Institute | Your Trusted HealthCare provider</p>
            <p className='text-lg mt-6'>
            MediSync Medical Institute is a premier healthcare institution dedicated to advancing medical education, research, and patient care. Our mission is to provide comprehensive medical services while fostering an environment of excellence in training future healthcare professionals. 
            </p>
        </div>
        <div className='md:w-[50%] object-cover' > 
          <Lottie options={defaultOptionsHospital} height={400}  />
        </div>

       </div>
       <div className='md:flex justify-between mt-32 pb-10'>
           <div className='md:w-[40%] object-cover'>
             <Lottie options={defaultOptionsHome} height={300}/>
           </div>
           <div className='md:w-[40%] px-4'>
            <h1 className='font-bold text-2xl '>Who are We ??</h1>
            <p className='text-lg' >We are a community of healthcare professionals, educators, and researchers working together to deliver top-notch medical training, conduct groundbreaking research, and provide comprehensive healthcare services. Our commitment is to equip the next generation of medical professionals with the knowledge and skills they need to thrive in a rapidly evolving healthcare environment.</p>
           </div>
       </div>
      <div className='w-full px-4'>
        <h1 className='text-2xl font-bold'> Departments</h1>
        <div className='md:flex md:gap-4 my-4 pb-10 w-full md:overflow-x-auto md:whitespace-nowrap no-scrollbar ' >
            <div className='flex-shrink-0'>
            <Card department={"Cardiology"} url={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_rBr4h58whrzsilOb5cq72KcMqGLcxdZlQQ&s"} /></div>
            <div className='flex-shrink-0'>
            <Card department={"Radiology"} url={"https://media.istockphoto.com/id/1778188472/photo/doctor-examining-x-ray-images-in-mri-control-room.jpg?s=612x612&w=0&k=20&c=Qyw6_HvR1H7Yy4U7Nqz_fByN9n5n0tJcfNOVGRJEPjQ="}/></div>
            <div className='flex-shrink-0'>
            <Card department={"Pediatrics"} url={"https://www.srskothiwalhospital.com/assets/images/doctors/doc-10.jpg"}/></div>
            <div className='flex-shrink-0'>
            <Card department={"Psychiatry"} url={"https://ssimsb.ac.in/public//uploads/course/1655208728.jpg"}/></div>
            <div className='flex-shrink-0'>
            <Card department={"ENT"} url={"https://ssimsb.ac.in/public//uploads/course/1655208447.jpg"}/></div>
            <div className='flex-shrink-0'>
            <Card department={"Neurology"} url={"https://hindumissionhospital.in/wp-content/uploads/2022/09/neurology-human.webp"}/></div>
            <div className='flex-shrink-0'>
            <Card department={"Orthopedics"} url={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuOf1-dzJwZQWcT-tcYd87AqLykPwyxZ9r1w&s"}/></div>
        </div>

        
      </div>
      <div className="my-8">
        <MessageForm/>

      </div>


      
    </div>

    </>
  )
}

export default Body
