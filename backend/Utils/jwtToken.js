export const sendToken=async(user,statusCode,message,res)=>{
  
      const token=await user.generateToken();
      const options={
        expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE *24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite: "None"
        
        
    }
      const cookieName= user.role ==="Admin"? "adminToken": "patientToken";
      res.status(statusCode).cookie(cookieName,token,options)
       .json({
        success:true,
        message,
        user,
        token
      })

}