import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAdmin = () => {
    const navigate=useNavigate();
    const [admin,setAdmin]=useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        password:"",
        dob:"",
        gender:""
    });
    const adminDataChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setAdmin({
        ...admin,
        [name]:value
    })

    }

    const handleFormSubmit=async(e)=>{
       e.preventDefault();
     const {firstName,lastName,email,phone,dob,gender,password}=admin;
     const myForm=new FormData();
     myForm.set("firstName",firstName)
     myForm.set("lastName",lastName)
     myForm.set("email",email)
     myForm.set("phone",phone)
     myForm.set("password",password)
     myForm.set("dob",dob)
     myForm.set("gender",gender)

     try {
        const response=await axios.post("http://localhost:4000/api/v1/user/admin/addnew",myForm,{withCredentials:true})
         console.log(response);
         toast.success(response.data.message)
         setAdmin({
            firstName:"",
            lastName:"",
            email:"",
            phone:"",
            password:"",
            dob:"",
            gender:""

         })
     } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.message)

     }

    }
  return (
    <div className='h-screen w-screen flex justify-center pt-8 bg-sky-300 bg-gradient-to-r from-white '>
      <div className=' h-[70%] w-[50%]  shadow-2xl bg-white p-4 rounded-xl' >
         <h1 className='text-xl font-bold text-center underline '>Add New Admin</h1>
         <form className='mt-4 pl-8 flex flex-col gap-2' onSubmit={handleFormSubmit}>
            <div>
           <label htmlFor='firstName ' className='text-lg'>First Name : </label>
           <input name="firstName" placeholder='Enter first Name' className='px-2 py-1 outline-none w-[50%]' onChange={adminDataChange} value={admin.firstName}></input>
           </div>
           <div>
           <label htmlFor='lastName ' className='text-lg'>Last Name : </label>
           <input name="lastName" placeholder='Enter last Name' className='px-2 py-1 outline-none w-[50%]'
           onChange={adminDataChange}  value={admin.lastName}></input>
           </div>
           <div>
           <label htmlFor='email ' className='text-lg'>Email : </label>
           <input name="email" placeholder='Enter Email' className='px-2 py-1 outline-none w-[50%]'
           onChange={adminDataChange} value={admin.email}></input>
           </div>
           <div>
           <label htmlFor='phone ' className='text-lg'>Phone : </label>
           <input name="phone" placeholder='Enter Phone number' className='px-2 py-1 outline-none w-[50%]'
           onChange={adminDataChange} value={admin.phone}></input>
           </div>
           <div>
           <label htmlFor='password ' className='text-lg'>Password : </label>
           <input name="password" placeholder='Enter password' className='px-2 py-1 outline-none w-[50%]'
           onChange={adminDataChange} value={admin.password}></input>
           </div>
           <div>
           <label htmlFor='gender ' className='text-lg'>Gender : </label>
           <select name="gender"  className='px-2 py-1 outline-none ' onChange={adminDataChange} value={admin.gender}>
            <option>select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
           </select>
           </div>
           <div>
           <label htmlFor='dob' className='text-lg'>DOB : </label>
           <input name="dob"  className='px-2 py-1 outline-none' type='date' onChange={adminDataChange} value={admin.dob}></input>
           </div>
            <div className='text-center mt-4' > 
                <button className='px-10 py-1 bg-sky-200 text-lg  rounded-2xl' type="submit" >Add</button>
            </div>
         </form>

      </div>
    </div>
  )
}

export default AddAdmin
