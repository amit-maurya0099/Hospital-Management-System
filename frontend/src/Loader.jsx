import React from 'react'
import Lottie from 'react-lottie'
import loaderAnimation from "./json/loaderAnimation.json"

const Loader = () => {
    const defaultLoaderOptions={
        autoPlay:true,
        loop:true,
        animationData:loaderAnimation,
        rendererSetting:{
            preserveAspectRatio:"xmidYmid slice"
        }

    }

  return (
    <div className=' absolute top-[35%] left-[45%]  '>
        <Lottie options={defaultLoaderOptions} height={150} width={150}/>
      
    </div>
  )
}

export default Loader
