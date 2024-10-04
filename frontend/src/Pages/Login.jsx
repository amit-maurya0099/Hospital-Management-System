import React, { useContext, useState } from 'react'
import Lottie from "react-lottie"
import loginAnimation from "../json/loginAnimation.json"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../ContextApi'
import Loader from '../Loader'



const Login = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(AppContext);
  const {setRole}=useContext(AppContext);
  const [user,setUser]=useState({
    email:"",
    password:"",
    role:""
  });
  const navigate=useNavigate();
  const defaultOptionsRegister={
      loop:true,
      autoplay:true,
      animationData: loginAnimation,
      rendererSetting:{
        preserveAspectRation: 'xMidYMid slice'
      }

  }
  const loginDataChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
     
    setUser({
      ...user,
      [name]:value
    })

  }

  const loginFormSubmit=async(e)=>{
    e.preventDefault();
   
    const {email,password,role}=user;
    const myForm=new FormData();
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("role",role);
    

    try {
        setLoading(true);
      const response=await axios.post("https://hospital-management-system-v5ju.onrender.com/api/v1/user/login",myForm,{
        withCredentials:true
      })

       
      if(response.status===200){
        setIsAuthenticated(true);
        toast.success(response.data.message);
        if(role==="Admin"){
          navigate("/dashboard")
          setRole("Admin");
        }
        else{
          navigate("/");
          setRole("Patient")
        }
        
      }
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  if(isAuthenticated){
    return navigate("/")
  }
  return (
    <>
    {loading ? <Loader/> : 
    <div className='bg-sky-200 bg-gradient-to-r from-white   px-[10%] md:flex justify-between items-center font-serif py-8'>
        <div className=' w-full md:w-[55%]  '>
          <Lottie options={defaultOptionsRegister} height={500}/>
           </div>
        <div className='w-full md:w-[35%] '>
            <h1 className='text-center font-semibold text-2xl underline'>Login</h1>
            <form className='py-4 px-[5%] grid grid-cols-1 gap-4 items-center bg-white rounded-xl mt-4' onSubmit={loginFormSubmit}>
              <div>
             <label htmlFor="email" className='text-lg '>Email :</label>
             <input name="email" type="email" className='py-1 text-lg  px-2 ml-2 outline-none md:w-[80%] ' placeholder='Enter your email' onChange={loginDataChange} value={user.email}></input>
             </div>
             <div>
             <label htmlFor="password" className='text-lg'>Password :</label>
             <input name="password" type="password" className='py-1 text-lg  px-2 ml-2 outline-none w-[50%] md:w-[70%]' placeholder='Password' value={user.password} onChange={loginDataChange}></input>
             </div>
             <div>
             <label htmlFor="role" className='text-lg'>Role :</label>
             <select name="role"  className='py-1 text-lg  px-2 ml-2 ' onChange={loginDataChange}>
              <option value=""> Select Role</option>
              <option value="Patient"> Patient</option>
              <option value="Admin"> Admin</option>
              
            
             </select>
             </div>
                  
        
        <div className='flex justify-center mt-4'>
        <button className=" text-xl px-4 py-1 bg-sky-500 text-white rounded-xl" type="submit">Login</button>
        </div>
        <p className='text-center mt-2'>Not Registered ? 
          <button onClick={()=>navigate("/register")} className='text-purple-800 pl-2 text-lg'> Register </button></p>
        </form>
 
        </div>
    </div>
}
    </>
  )
}

export default Login

