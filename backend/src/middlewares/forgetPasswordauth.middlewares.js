import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'; 
import Admin from "../models/admin.models.js";

const userVerify = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.pasaccesswoToken || req.header("Authorization")?.replace("Bearer ","")
        console.log("middlewaretoken",token)
    if(!token){
        throw new ApiError(400,"Unauthorised request")
    }
    const decodedToken = jwt.verify(token, process.env.PASSWORD_CHANGE_TOKEN_SECRET)
    if(!decodedToken){
        throw new ApiError(400 , "Access Denied")
    }
    console.log("decoded middleware token",decodedToken)
    const email = decodedToken.email
    req.email = email
    next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")    
   }   
    
})

export {userVerify}