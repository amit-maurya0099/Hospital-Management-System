import React, { useContext, useEffect, useState }  from 'react'
import { PiSquaresFourLight } from "react-icons/pi";
import { PiUsersFourLight } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { IoHelpCircleOutline } from "react-icons/io5";
import Cookies from "js-cookie"
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../ContextApi';
import Overview from '../adminComponents/Overview';

const Dashboard = () => {
  const location=useLocation();
  const {isAuthenticated,setIsAuthenticated,setLoading}=useContext(AppContext);
  const [activebtn, setActiveBtn]=useState();
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try {
      setLoading(true);
     const response=await axios.get("http://localhost:4000/api/v1/user/admin/logout",{withCredentials:true})
     
     if(response.status===200){
      setLoading(false)
       toast.success(response.data.message);
       navigate("/");
       setIsAuthenticated(false);
       setRole(null)
        Cookies.remove("userRole")

     }
     
     
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setLoading(false);
    }
   }
    
  const handleButtonClick = (path) => {
    setActiveBtn(path); 
   
  };
  useEffect(() => {
    if (activebtn) {
      navigate(activebtn); 
    }
  }, [activebtn]);
 
  
  return (
    <div className='min-h-screen bg-[#abcae7] p-[2%] font-serif '> 
    <div  className=' bg-white min-h-screen p-4 flex  gap-2 '>
      <div className='w-[20%] min-h-screen px-4 shadow-2xl rounded-2xl '>
    <h1 className='font-bold text-2xl'>MediSync</h1>
    <div className='mt-[15%] text-lg '>
      <ul  className="border-b flex flex-col gap-4 pb-4 ">
        <li className='flex gap-4 items-center'><PiSquaresFourLight className='size-6'/>
         <button onClick={()=>handleButtonClick("overview")} className={activebtn === "overview" ? "text-blue-500": ""}>Overview</button></li>
        <li className='flex gap-4 items-center'><HiOutlineClipboardList className='size-6'/>
         <button onClick={()=>handleButtonClick("appointments")} className={activebtn === "appointments"? "text-blue-500": ""}>Appointments</button></li>
        <li  className='flex gap-4 items-center'><PiUsersFourLight className='size-6'/>
        <button onClick={()=>handleButtonClick("add/admin")} className={activebtn === "add/admin" ? "text-blue-500": ""}>Add New Admin</button></li>
        <li  className='flex gap-4 items-center'><FaUserDoctor className='size-6'/>
        <button onClick={()=>handleButtonClick("doctors")} className={activebtn === "doctors"? "text-blue-500": ""}>Doctors</button></li>
        <li  className='flex gap-4 items-center'><TbNotes className='size-6'/>
        <button onClick={()=>handleButtonClick("departments")} className={activebtn === "departments"? "text-blue-500": ""}>Departments</button></li>
        <li  className='flex gap-4 items-center'><AiOutlineMedicineBox className='size-6'/>
        <button onClick={()=>handleButtonClick("products")} className={activebtn === "products"? "text-blue-500": ""}> Products & Stocks</button></li>
      </ul>
        <ul className='flex flex-col gap-4 mt-4'>
        <li  className='flex gap-4 items-center'><IoIosLogOut className='size-6'/><button onClick={handleLogout}>Logout</button></li>
        <li  className='flex gap-4 items-center'><IoHelpCircleOutline className='size-6'/>
        <button onClick={()=>handleButtonClick("support")} className={activebtn === "support" ? "text-blue-500": ""}>Help & support</button></li>
        </ul>
    </div>
      </div> 
      {location.pathname ==="/dashboard"?<Overview/>: <Outlet/>}
         

      
    </div>
    </div>
  )
}

export default Dashboard

