import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './ContextApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from "js-cookie"
import { IoMenu } from "react-icons/io5";
import NavMenu from './NavMenu';

const Navbar = () => {
    const navigate=useNavigate();
    const {isAuthenticated,setIsAuthenticated,user,userRole,loading,setLoading,isMenuOpen,setMenuOpen}=useContext(AppContext);
    
    const handleLogout=async()=>{
        try {
            setLoading(true)
            let url;
            if(user.role==="Admin"){
                url="https://hospital-management-system-v5ju.onrender.com/api/v1/user/admin/logout"
            }
            else if(user.role==="Patient"){
                url="https://hospital-management-system-v5ju.onrender.com/api/v1/user/patient/logout"
            }

            const response=await axios.get(url,{withCredentials:true})
            
          if(response.status===200){
             toast.success(response.data.message)
             navigate("/");
             setIsAuthenticated(false);
              Cookies.remove("userRole")
          }
          setLoading(false)
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setIsAuthenticated(false);
            setLoading(false);
        }
          

       
       
     }

     

 
  return (
     
    
    <div className='sticky z-20 top-0  md:px-[10%] bg-white h-14  flex items-center justify-between font-serif '>
        <div className='flex items-center px-2'>
          <button className='h-full md:hidden' onClick={()=>setMenuOpen(!isMenuOpen)}><IoMenu className='size-8'/></button>  
        <h1 className='font-semibold text-2xl px-4'> MediSync</h1>
        </div>
         
        <div className='max-md:hidden'>
            <ul className='flex text-xl gap-4   '>
                <li className='hover:text-sky-400'><button onClick={()=>navigate("/")}>Home</button></li>
                <li className='hover:text-sky-400'><button onClick={()=>navigate("/appointment")} >Appointment</button ></li>
                <li className='hover:text-sky-400'><button onClick={()=>navigate("/about")}>About Us</button></li> 
            </ul>
        </div>
        {isAuthenticated ? <div> <button className='text-lg py-1 px-4 bg-sky-300 rounded-2xl' onClick={handleLogout}>Logout</button></div>
         :
           <div className='flex gap-2'>
            <button className='text-lg py-1 px-4 bg-sky-300 rounded-2xl'onClick={()=>navigate("/register")}>Register</button>
            <button className='text-lg py-1 px-4 bg-sky-300 rounded-2xl' onClick={()=>navigate("/login")}>Login</button>

            </div>
        }
      
     {isMenuOpen && <NavMenu/>}
     
    </div>

  )
}

export default Navbar
