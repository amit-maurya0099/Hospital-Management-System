import React from 'react'
import Logo from "./Logo.jpeg"

const Footer = () => {
  return (
    <div className=' bg-gray-300 mb-10  '>
      <div className=' md:flex md:justify-between py-8 md:px-[10%] grid grid-cols max-sm:justify-center gap-4 '>
        <div>
          <img src={Logo} alt="/" className='h-[200px] w-full md:w-[200px] object-cover'></img>
        </div>
        <div >
          <h1 className='font-bold text-xl '>Quick Links</h1>
          <div className='mt-2'>
            <p>Home</p>
            <p>Appointement</p>
            <p>About</p>
          </div>

        </div>
        <div >
          <h1 className='font-bold text-xl'>Hours</h1>
          <div className='mt-2'>
          <p>Monday -  9:00 AM - 11:00 PM </p>
          <p>Tuesday -  9:00 AM - 11:00 PM </p>
          <p>Wednesday -  9:00 AM - 11:00 PM </p>
          <p>Thursday -  9:00 AM - 11:00 PM </p>
          <p>Friday -  9:00 AM - 11:00 PM </p>
          <p>Saturday -  9:00 AM - 11:00 PM </p>
          </div>
        </div>
        <div>
          <h1 className='font-bold text-xl'>Contacts</h1>
          <div className='mt-2'>
          <p>amit1@gmail.com</p>
          <p>8765533438</p>
          <p>Gorakhpur,U.P</p>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Footer
