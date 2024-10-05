import React, { useContext, useState } from 'react'
import Lottie from "react-lottie"
import registerAnimation from "../json/registerAnimation.json"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../ContextApi'
import Loader from '../Loader'


const Register = () => {
  const {isAutheticated,loading,setLoading}=useContext(AppContext); 
  const navigate=useNavigate();
  const [user,setUser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    password:"",
    gender:"",
    dob:"",
    role:""

  });
 
  const defaultOptionsRegister={
      loop:true,
      autoplay:true,
      animationData:registerAnimation,
      rendererSetting:{
        preserveAspectRation: 'xMidYMid slice'
      }

  }


  const registerDataChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setUser({
      ...user,
      [name]:value
    })



  }

  const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const {firstName,lastName,email,phone,dob,role,password,gender}=user;
        let myForm=new FormData();
        myForm.set("firstName",firstName);
        myForm.set("lastName",lastName);
        myForm.set("email",email);
        myForm.set("phone",phone);
        myForm.set("password",password);
        myForm.set("role",role);
        myForm.set("dob",dob);
        myForm.set("gender",gender);

        try {
          setLoading(true);
           const response=await axios.post("https://hospital-management-system-v5ju.onrender.com/api/v1/user/patient/register",myForm)

           if(response.status===200){
              toast.success(response.data.message);
              navigate("/login")
           }
           setLoading(false);

        } catch (error) {
          console.log(error.response)
          toast.error(error.response.data.message)
          setLoading(false);
          
        }
        

  }
  
  if(isAutheticated){
    return navigate("/")
  }


  return (
    <>
    {loading ? <Loader/> :
    <div className='bg-sky-200 bg-gradient-to-r from-white min-h-screen  px-[10%] md:flex justify-between font-serif py-8'>
        <div className=' w-full md:w-[35%]  '>
          <Lottie options={defaultOptionsRegister} height={500}/>
           </div>
        <div className=' w-full md:w-[55%] '>
            <h1 className='text-center font-semibold text-2xl underline'>Register</h1>
            <form className='py-4 px-[5%] bg-white rounded-xl mt-4' onSubmit={handleFormSubmit}>
        
        
            <div className='grid grid-cols-1 gap-4 md:flex md:justify-between  my-8'>
                <input 
                className='w-[100%] md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='First Name'
                name="firstName"
                value={user.firstName}
                onChange={registerDataChange}

                ></input>
                <input
                className=' w-[100%] md:w-[40%] border border-gray-700 bg-slate-100 pl-2 py-1'
                placeholder='Last Name'
                name="lastName"
                value={user.lastName}
                onChange={registerDataChange}
                
                
                ></input>
            </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between  my-8'>
                <input 
                className='w-full md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='Email'
                name="email"
                value={user.email}
                onChange={registerDataChange}

                ></input>
                <input 
                className='w-full md:w-[40%] border border-gray-700 bg-slate-100 pl-2 py-1'
                placeholder='Mobile Number'
                name="phone"
                value={user.phone}
                onChange={registerDataChange}
                
                
                ></input>
            </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between my-4'>
                <input 
                className='w-full md:w-[40%] border border-gray-700 pl-2 py-1 bg-slate-100'
                placeholder='password'
                name="password"
                value={user.password}
                onChange={registerDataChange}

                ></input>
                <div className='py-1 md:w-[40%] w-full '>
                <label htmlFor="gender" className='text-lg '>Gender : </label>
                <select name="gender" className='text-lg py-1 px-4' onChange={registerDataChange} >
                 <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                </div>
                
               
             </div>
            <div className=' grid grid-cols-1 gap-4 md:flex md:justify-between  md:my-8'>
              <div>
                <label htmlFor="dob" className='text-lg'>DOB :</label>
                <input type="date" className='py-1 px-4 ml-6' name="dob" value={user.dob} onChange={registerDataChange}></input>
              </div>
              <div className='py-1 w-full md:w-[40%]'>
                <label htmlFor="role" className='text-lg '>Role: </label>
                <select name="role" className='text-lg py-1 px-2 md:w-[80%]' onChange={registerDataChange}>
                 <option value="">Select Role</option>
                  <option value="Patient">Patient</option>
                 
                </select>
                </div>

              </div> 
        
        <div className='flex justify-center mt-4'>
        <button className=" text-xl px-4 py-1 bg-sky-500 text-white rounded-xl" type="submit">Register</button>
        </div>
        <p className='text-center mt-4'>Already Registered ? 
          <button onClick={()=>navigate("/login")} className='text-purple-800 pl-2 text-lg'> login </button></p>
        </form>
 
        </div>
    </div>
    }
    </>
  )
}

export default Register
