import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import axios from "axios";
const AppContext=createContext();

const AppProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [user,setUser]=useState(null);
    const [userRole,setUserRole]=useState(null);
    const [messages,setMessages]=useState([]);
    const [appointments,setAppointments]=useState([]);
    const[isFormOpen,setFormOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const[isMenuOpen,setMenuOpen]=useState(false);
    const verfiyAuth=async()=>{
        try {
          let response; 
          const roleFromCookie = Cookies.get("userRole");
          
          
          
            
          if(roleFromCookie==="Patient"){ 
          response=await axios.get("http://localhost:4000/api/v1/user/patient/me",{withCredentials:true})
          }
          else if(roleFromCookie ==="Admin"){
            response=await axios.get("http://localhost:4000/api/v1/user/admin/me",{withCredentials:true})
          }

          if(response && response.status===200){
            setIsAuthenticated(true);
            setUser(response.data.user)
            setUserRole(roleFromCookie)

          }
            
        } catch (error) {
            setIsAuthenticated(false);
            setUser({});
            
        }   
      
         
    }
    // set role
    const setRole=(role)=>{
         setUserRole(role);
         Cookies.set("userRole",role);
    }
    /// get all messages
    const getAllMessages=async()=>{
      try {
        const response=await axios.get("http://localhost:4000/api/v1/message/all",{withCredentials:true})
        if(response.status===200){
          setMessages(response.data.messages);
        }
        
      } catch (error) {
        console.log(error.response.data);
      }
    }
   // get All appointments
   const getAllAppointments=async ()=>{
    try {
      const response=await axios.get("http://localhost:4000/api/v1/appointment/all",{withCredentials:true})
       if(response.status ===200){
            setAppointments(response.data.appointments)
       }
      
    } catch (error) {
      console.log(error.response.data)
      
    }
   }

  
    useEffect(()=>{
        verfiyAuth();
      if(userRole==="Admin" && userRole!==null && isAuthenticated === true) {
        getAllMessages();
         getAllAppointments();
       
        }
    },[isAuthenticated]);
     
    
    return(

        <AppContext.Provider  value={{isAuthenticated,setIsAuthenticated,user,userRole,setRole,messages,appointments,getAllAppointments,isFormOpen,setFormOpen,loading,setLoading,isMenuOpen,setMenuOpen}}>
            {children}
        </AppContext.Provider>
    )

}

export {AppContext, AppProvider};