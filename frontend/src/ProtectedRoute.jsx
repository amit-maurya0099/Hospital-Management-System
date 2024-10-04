import React, { useContext } from 'react'
import { AppContext } from './ContextApi'

const ProtectedRoute = ({Children,requiredRole}) => {
     const {isAuthenticated , userRole}=useContext(AppContext); 
     if(!isAuthenticated || userRole !== requiredRole){
        return <div className='flex text-xl font-bold h-screen justify-center items-center '><p>Not Authorised to access this Resource</p></div>
     }
     return <Children/>

}

export default ProtectedRoute;
