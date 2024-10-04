import React from 'react'

const DoctorCard = ({url,name,experience,type}) => {
  return (
    <div className='w-[200px] h-[300px] shadow-xl rounded-xl'>
       <img src={url} alt="/" className='w-full h-[200px] object-cover'></img>
       <div className='font-medium  text-lg text-center'>
       <h1>{name}</h1>
       <h1>{experience} + </h1>
       <h1>{type}</h1>
       </div>
    </div>
  )
}

export default DoctorCard
