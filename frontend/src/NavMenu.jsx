import React, { useContext } from 'react'
import { IoHome } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { AppContext } from './ContextApi';
const NavMenu = () => {
    const navigate=useNavigate();
    const {isMenuOpen,setMenuOpen}=useContext(AppContext);
  return (
    <div className='bg-white absolute  top-12  shadow-xl rounded-lg  py-6 z-20 px-3'>
        <ul className='text-lg ' >
            <li><button className='flex gap-2 items-center' onClick={()=>{navigate("/"); setMenuOpen(false)}}><IoHome/>  Home</button></li>
            <li><button className='flex gap-2 items-center  ' onClick={()=>{navigate("/appointment"); setMenuOpen(false)}}> <TbNotes/>Appointment</button></li>
            <li><button className='flex gap-2 items-center ' onClick={()=>{navigate("/about"); setMenuOpen(false)}}> <BiMessageSquareDetail/>About Us</button></li>
        </ul>
      
    </div>
  )
}

export default NavMenu
