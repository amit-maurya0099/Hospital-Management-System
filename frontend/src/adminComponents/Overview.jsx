import React from 'react'

import { useContext } from 'react';
import { AppContext } from '../ContextApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"

const Overview = () => {
    const {user,messages,setRole,appointments}=useContext(AppContext);
    const navigate=useNavigate()
  
    
   
  return (
   
   
    <div className='w-[80%] h-screen  '>
          <div className='h-[35%] flex justify-between p-2'>
            <div className='w-[50%] bg-[#b0d1e1] flex rounded-xl '>
              <div className='w-[40%] h-[80%]'>
                <img src="https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png" alt="" className='rounded-full object-cover'></img>
              </div>
               <div className='pt-[10%] w-[60%] px-2' >
                <h1 className='text-xl font-bold'>Hello! <span className='text-fuchsia-900'>Dr. { (user && user.firstName) + " " + (user && user.lastName)} </span></h1>
                <h1> I am committed to provide personalized treatment plans, helping patients manage their conditions with the latest advancements in medical science.</h1>
               </div>
                 </div> 
            <div className='w-[20%] bg-[#b0d1e1] h-full border  text-xl font-bold flex flex-col gap-2 items-center justify-center rounded-xl' > 
              <h1  >Appointments</h1>
              <h1>{appointments && appointments.length}</h1>
            </div>
            <div className='w-[20%] bg-[#b0d1e1] h-full border  text-xl font-bold flex flex-col gap-2 items-center justify-center rounded-xl' >
              <h1>Messages</h1>
              <h1>{messages && messages.length}</h1>
              </div> 
          </div>
          <div className='mt-10 p-2  border '>
            <h1 className='font-bold text-xl'>All Messages</h1>
            <div className='mt-4 flex flex-col gap-4 h-80  overflow-auto '>
             {messages && messages.map((message)=>
            
               <div className=' bg-white border border-black rounded-xl p-2 ' key={message._id}>
                <h1>Id: {message._id}</h1>
                <h1>Name: {message.firstName + " " + message.lastName}</h1>
                <h1>Email: {message.email}</h1>
                <h1>Phone: {message.phone}</h1>
                <h1>Message: {message.message}</h1>
               </div>
               
            
            )}
            </div>
          </div>
   
    </div>


     
  )
}

export default Overview
