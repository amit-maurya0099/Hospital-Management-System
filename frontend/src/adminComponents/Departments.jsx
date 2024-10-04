import React from 'react'
import Card from '../Card'

const Departments = () => {
  return (
    <div className='h-screen w-screen bg-sky-300 bg-gradient-to-r from-white py-[2%]'>
          <h1 className='text-xl font-bold text-center'>Departments</h1>
          <div className=' pb-10 w-full flex flex-wrap gap-8 justify-evenly ' >
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
  )
}

export default Departments
