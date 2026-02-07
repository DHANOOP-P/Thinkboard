import  ratelimit from "../config/upstash.js"


const rateLimiter =async(req,resizeBy,next)=>{
  try {
    const { success }=await ratelimit.limit("my-limit-key");
    if(!success){
        return resizeBy.status(429).json({
            message:"too amny requestes please try later"
        });
    }
    next();
  } catch (error) {
    console.log("rate limit error",error);
    next(error);
  }
};
export default rateLimiter;