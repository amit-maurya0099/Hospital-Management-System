import React from 'react'

const Card = ({department,url}) => {
  return (
    <div className='relative mt-4 w-full md:w-[250px] h-[250px] rounded-xl border'>
       <h1 className='absolute bottom-1 md:left-[30%]  left-[40%] px-4 py-2 bg-white rounded-2xl font-semibold'>{department}</h1>
       <img src={url} alt="/" className='object-cover h-full w-full rounded-xl'></img>
    </div>
  )
}

export default Card
