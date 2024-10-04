import React, { useContext, useState } from 'react'
import { GrClose } from "react-icons/gr";
import { AppContext } from '../ContextApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Loader';

const AddDoctorForm = () => {
    
    const {isFormOpen,setFormOpen,loading,setLoading}=useContext(AppContext);
    const [docAvatar,setDocAvatar]=useState("");
    const [docAvatarPreview,setDocAvatarPreview]=useState("https://i.pinimg.com/736x/61/f7/5e/61f75ea9a680def2ed1c6929fe75aeee.jpg");

    const [doctor,setDoctor]=useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        password:"",
        dob:"",
        gender:"",
        experience:"",
        department:"",
        

    });

    const  doctorDataChange=(e)=>{
     let name=e.target.name;
     let value=e.target.value;
     if(name==="avatar"){
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onload=()=>{
            setDocAvatar(file);
            setDocAvatarPreview(reader.result)
            
        }
        
     }  
        
    else{
     setDoctor({
        ...doctor,
        [name]:value
     })
    }}

    const handleFormSubmit=async(e)=>{
           e.preventDefault();
        
           const {firstName,lastName,email,phone,dob,gender,password,experience,department}=doctor;
           const myForm=new FormData();
           myForm.set("firstName",firstName)
           myForm.set("lastName",lastName)
           myForm.set("email",email)
           myForm.set("phone",phone)
           myForm.set("dob",dob)
           myForm.set("gender",gender)
           myForm.set("password",password)
           myForm.set("doctorDepartment",department)
           myForm.set("docAvatar",docAvatar)
           myForm.set("experience",experience)

           
           try {
             setLoading(true)
            const response=await axios.post("http://localhost:4000/api/v1/user/doctor/new",myForm,{withCredentials:true})
            toast.success(response.data.message);
            setFormOpen(false);
            console.log(response.data)
            
           } catch (error) {
             toast.error(error.response.data.message);
             console.log(error);
             setLoading(false);
           }
           setLoading(false);
    }
   
  return (
    
  
      <div className=' h-[75%] w-[50%]  shadow-2xl bg-white p-4 rounded-xl absolute top-[20%] left-[35%]  ' >
      
        <div className='flex justify-between '>
       <h1 className='text-xl font-bold text-center underline '>Add New Doctor</h1>
       <button className='text-xl font-bold ' onClick={()=>setFormOpen(false)}><GrClose/></button></div>
       {loading ? <Loader/> :
         <>
       <form className='mt-4 pl-8 flex flex-col gap-2' onSubmit={handleFormSubmit}>
          <div className='flex justify-between'>
            <div className='w-[45%]'>
         <label htmlFor='firstName ' className='text-lg'>First Name : </label>
         <input name="firstName" placeholder='Enter first Name' className='px-2 py-1 outline-none ' onChange={doctorDataChange} value={doctor.firstName}></input></div>
         <div className='w-[45%]'>
         <label htmlFor='lastName ' className='text-lg'>Last Name : </label>
         <input name="lastName" placeholder='Enter last Name' className='px-2 py-1 outline-none '
         onChange={doctorDataChange}  value={doctor.lastName}></input></div>
         </div>
         <div className='flex justify-between'>
            <div className='w-[45%]'>
         <label htmlFor='email ' className='text-lg'>Email : </label>
         <input name="email" placeholder='Enter Email' className='px-2 py-1 outline-none'
         onChange={doctorDataChange} value={doctor.email}></input></div>
         <div className='w-[45%]'>
         <label htmlFor='phone ' className='text-lg'>Phone : </label>
         <input name="phone" placeholder='Enter Phone number' className='px-2 py-1 outline-none'
         onChange={doctorDataChange} value={doctor.phone}></input></div>
         </div>
         <div className='flex justify-between'>
            <div  className='w-[45%]'>
         <label htmlFor='password ' className='text-lg'>Password : </label>
         <input name="password" placeholder='Enter password' className='px-2 py-1 outline-none '
         onChange={doctorDataChange} value={doctor.password}></input></div>
         <div className='w-[45%]'>
         <label htmlFor='gender ' className='text-lg '>Gender : </label>
         <select name="gender"  className='px-2 py-1  outline-none ' onChange={doctorDataChange} value={doctor.gender}>
          <option>select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
         </select></div>
         </div>
         <div className='flex justify-between'>
         <div className='w-[45%]'>
         <label htmlFor='dob' className='text-lg'>DOB : </label>
         <input name="dob"  className='px-2 py-1 outline-none' type='date' onChange={doctorDataChange} value={doctor.dob}></input>
         </div>
         <div className='w-[45%]'>
         <label htmlFor="department" className='text-lg '>Department: </label>
                <select name="department" className=' py-1 px-2 outline-none' onChange={doctorDataChange} value={doctor.department}>
                 <option value="">Select department</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="ENT">ENT</option>

                 
                </select>
         </div>
         </div>
         <div className='flex justify-between'>

            <div className='flex gap-4'>
            <label htmlFor="avatar" className='text-lg'> Avatar : </label>

            <img src={docAvatarPreview} alt="/" className='object-cover size-8 rounded-full'></img>
            <input type='file' name="avatar" accept='image/*' onChange={doctorDataChange} />
            </div>
            
         </div>
         <div>
        <label htmlFor="experience">Experience :</label>
        <input name="experience"  placeholder='Enter Experience' className='outline-none px-2 py-1'onChange={doctorDataChange} value={doctor.experience} ></input>
         </div>
          <div className='text-center mt-4' > 
              <button className='px-10 py-1 bg-sky-200 text-lg  rounded-2xl' type="submit" >Add</button>
          </div>
       </form>
       </>
}


    </div>
 
  )
}

export default AddDoctorForm
