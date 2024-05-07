import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import Admin from "../models/admin.models.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const genrateAdminKey = function (length){
    const  characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|[]\\;\',./';
    let result = '';
    
    for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       result += characters.charAt(randomIndex);
     }
   
     return result;
};

const genrateUniqueCode = function(length){
    const characters = '0123456789' ; 
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result ; 

}

const registerAdmin = asyncHandler(async(req,res)=>{

    const {fullname ,email , password ,confirmPassword, username , schoolName,schoolAdress,schoolMobile, adminMobile,profileImage,schoolImage} = req.body      ; 
    
   if ([fullname ,email , password ,confirmPassword,username , schoolName,schoolAdress,schoolMobile,adminMobile,profileImage,schoolImage].some((field) => field?.trim()=== "")){
        throw new ApiError(400,"All feilds all required ")
   }  
   
   const existedAdmin = await Admin.findOne({
    $and:[{email},{username}]
   })

   if(existedAdmin){
    throw new ApiError(400,"Admin already exist")
   }

   if(password!=confirmPassword){
    throw new ApiError(401,"Invalid Credentials{password and confirm password should be same}")
   }

   let profileLocalPath;
   if(req.files && Array.isArray(req.files.profileImage)&& req.files.profileImage.length > 0){
    console.log(req.files.profileImage[0])
    profileLocalPath = req.files.profileImage[0].path
   }

   console.log(profileLocalPath);

   let schoolImageLocalPath;
   if(req.files && Array.isArray(req.files.schoolImage)&& req.files.schoolImage.length > 0){
    console.log(req.files.schoolImage[0])
    schoolImageLocalPath = req.files.schoolImage[0].path
   }

   console.log(schoolImageLocalPath);

   if(!(profileLocalPath)){
    throw new ApiError(400,"Profile Image is required")
   }

    if(!(schoolImageLocalPath)){
        throw new ApiError(400,"School Image is required")
    }

   const profileImageUrl = await uploadOnCloudinary(profileLocalPath,"profileImage")
   const schoolImageUrl = await uploadOnCloudinary(schoolImageLocalPath,"schoolImage")

   if(!profileImageUrl){
    throw new ApiError(400,"Profile Image upload failed")
   }
   
   if(!schoolImageUrl){
    throw new ApiError(400,"School Image upload failed")
   }

   const accessKey = genrateAdminKey(12)
   const schoolUniqueCode = genrateUniqueCode(10)
   console.log(accessKey);
   console.log(schoolUniqueCode);

   const theAdmin = await Admin.create({
    fullname ,
    email , 
    password ,
    username , 
    schoolName, 
    schoolUniqueCode, 
    accessKey,
    schoolAdress,
    schoolMobile,
    adminMobile,
    profileImage :profileImageUrl?.url || "",
    schoolImage : schoolImageUrl?.url || "",
   })

   const OurAdmin= await Admin.findById(theAdmin._id).select(
    "-password -refreshToken"
    )

    if(!OurAdmin){
        throw new ApiError(500,"Something went wrong in serverside , please Try again Later")
    }
    await sendEmail(email) ;
    
    return res.status(201).json(
        new ApiResponse(200,OurAdmin," Admin succesfully registered")
    )
})

export {registerAdmin}