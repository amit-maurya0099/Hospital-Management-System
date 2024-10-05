import React, { useContext, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify";
import { AppContext } from './ContextApi';

const MessageForm = () => {
  const {loading,setLoading}=useContext(AppContext);
  const [user,setUser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    message:""

  });
 

  const messageDataChange=(e)=>{

   let name=e.target.name;
   let value=e.target.value;
  
    setUser({
      ...user,
      [name]:value
    })
  
    
  }
  const handleFormSubmit=async(e)=>{
          e.preventDefault();
        const {firstName,lastName,email,phone,message}=user;
        const myForm=new FormData();
        myForm.set("firstName",firstName);
        myForm.set("lastName",lastName);
        myForm.set("email",email);
        myForm.set("phone",phone);
        myForm.set("message",message);
      
       try{
        
         const response = await axios.post("http://localhost:4000/api/v1/message/send", myForm, {
          headers: {
            "Content-Type": "multipart/form-data", 
          }})
          
            if(response.status === 200){
              toast.success(response.data.message);
              setUser({
                firstName:"",
                lastName:"",
                email:"",
                phone:"",
                message:""
            
              })

            }
            
        } catch(error){
          console.log(error.response);
          
          toast.error(error.response.data.message);
        }
          
  }

  return (
    <form className='py-8 px-[5%]' onSubmit={handleFormSubmit}>
         <h1 className='text-center font-bold text-2xl '>Send Us a Message</h1>
        
            <div className='grid grid-cols-1 gap-4 md:flex md:justify-between  my-8'>
                <input 
                className='w-[100%] md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='First Name'
                name='firstName'
                onChange={messageDataChange}
                value={user.firstName}
                ></input>
                <input
                className=' w-[100%] md:w-[40%] border border-gray-700 bg-slate-100 pl-2 py-1'
                placeholder='Last Name'
                name="lastName"
                value={user.lastName}
                onChange={messageDataChange}

                
                ></input>
            </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between  my-8'>
                <input 
                className='w-full md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='Email'
                 name='email'
                value={user.email}
                onChange={messageDataChange}

                ></input>
                <input 
                className='w-full md:w-[40%] border border-gray-700 bg-slate-100 pl-2 py-1'
                placeholder='Mobile Number'
                name="phone"
                value={user.phone}
                onChange={messageDataChange}
                
                
                ></input>
            </div>
        <textarea 
        placeholder='write your message' 
        className='w-full border border-gray-700 h-24 text-black bg-slate-100 pl-2 pt-2'
         value={user.message}
         name="message"
         onChange={messageDataChange}
        ></textarea>
        <div className='flex justify-center mt-4'>
        <button className=" text-xl px-2 py-2 bg-sky-500 text-white rounded-xl" type='submit'>Send Message</button>
        </div>
        </form>
       
    
  )
}

export default MessageForm
