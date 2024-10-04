
class errorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware=(err,req,res,next)=>{
    err.message= err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;

    const errorMessage=err.errors? Object.values(err.errors).map((error)=>error.message).join(", "):err.message;
   return res.status(err.statusCode).json({
    success:false,
    message:errorMessage
   })
}
 
export default errorHandler;