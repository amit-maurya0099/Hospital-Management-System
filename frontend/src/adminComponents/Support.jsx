import React from 'react'
import Logo from "../Logo.jpeg"

const Support = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='h-[60%] w-[70%]  bg-sky-300 bg-gradient-to-r from-white flex justify-between gap-10  items-center'>
           <div>
          <img src={Logo} className='w-[300px] h-[250px] rounded-full '></img>
          </div>
          <div className='text-lg mt-4' >
            <h1>Email : info.medisync@gmail.com </h1>
            <h1>phone : 9866546242 </h1>
            <h1>Instagram : medisync_healthcare </h1>
            <h1>Address: 123 Health Avenue,
                   Block C, Sector 14,
                    Newtown City, 560078,
                    Karnataka, India </h1>
          </div>
      </div>
      
    </div>
  )
}

export default Support
