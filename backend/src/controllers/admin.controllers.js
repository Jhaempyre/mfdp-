import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import Admin from "../models/admin.models.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const genrateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const User = await Admin.findById(userId);
        const accessToken = User.genrateAccessToken();
        const refreshToken = User.genrateRefreshToken();
        User.refreshToken = refreshToken;
        User.save({ validateBeforeSave: false }); 
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(420, "You are not authorised");
    }
};

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
    await sendEmail(email,fullname,accessKey) ;

    return res.status(201).json(
        new ApiResponse(200,OurAdmin," Admin succesfully registered")
    )
})

const adminLogin = asyncHandler(async(req,res)=>{
    
    const {email, password,username} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    if(!password){
        throw new ApiError(400,"password is required")
    }
    const logAdmin = await Admin.findOne({
        $or : [{username},{email}]
    })
    if(!logAdmin){
        throw new ApiError(400,"Invalid Credentials or Admin doesn't exsist")
    }
    const isPasswordValid = await logAdmin.isPasswordCorrect(password)
    if (!(isPasswordValid)){
        throw new ApiError(405, "invalid credential")
     }

    const {accessToken, refreshToken} = await genrateAccessTokenAndRefreshToken(logAdmin._id)
    const loggedInAdmin = await Admin.findById(logAdmin._id).select("-password -refreshToken")
    console.log(loggedInAdmin)

    const options = {
        httpOnly : true ,
        secure : true
    }


    return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200, 
        {
            Admin : loggedInAdmin,
            accessToken : accessToken,
            refreshToken : refreshToken
        },
        "Admin logged In Successfully"
    )
)
})

const logOutAdmin = asyncHandler(async(req,res)=>{
    // chek form miidle ware is user looged in 
    await Admin.findByIdAndUpdate(
       req.theAdmin._id,
       {
           $unset:{
               refreshToken : 1
           }
       }, 
           {
               new : true
           }
    )
    const options = {
       httpOnly: true,
       secure: true
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200, {}, "Admin logged Out"))
})
const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword,newConsfirmPassword} = req.body
    const User = await Admin.findById(req.theAdmin?._id);
    if (!User){
        throw new ApiError(404,"User not found")
    }
    // chek if password is correct
    const validation = await User.isPasswordCorrect(oldPassword)
    // chekckung the validation 
    if (!validation){
        return res.status(400).json(new ApiResponse(400, {}, "Old Password is incorrect"))
    }
    //update password to database and get user 
    User.password = newPassword
    await User.save({validateBeforeSave: false})
    return res.status(200).
    json(new ApiResponse(
        200,
        {},
        "Password changed successfully"
    ))
})
const updateRefreshToken = asyncHandler(async(req,res)=>{
    const cookieRefreshToken = (req.cookies.refreshToken) || (req.body.refreshToken)
    //console.log(cookieRefreshToken)
    if(!cookieRefreshToken){
        throw new ApiError(400,"You are not Uthorised")
    }
    const decodedRefresh = jwt.verify(cookieRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    console.log("decodedRefresh");
    console.log(decodedRefresh);
    const User = await Admin.findById(decodedRefresh?._id)
    if (!User){
        throw new ApiError(402,"You are not authorised")
    }
    if(cookieRefreshToken !== User?.refreshToken){
        throw new ApiError(403,"refresh token is used & need to login again")
    }
    const options = {
        httpOnly: true,
        secure: true
    }


})
export {registerAdmin,
        adminLogin,
        logOutAdmin,
        changePassword
}































