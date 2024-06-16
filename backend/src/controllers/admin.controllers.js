import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import Admin from "../models/admin.models.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import OTP from "../models/otp.models.js";
import sendOtpMail from "../utils/sendOtpEmail.js";

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

const genrateAccessTokenForPasswordReset= async(finderId)=>{
    try {
        const OTp = await OTP.findById(finderId);
        console.log("otp",OTp)
        if (!OTp)
             throw new ApiError(404,"invalid user , you are not registered with us.")
        console.log("server hu mae ")    
        const pasaccesswoToken = await OTp.generateAccessToken();
        console.log("raja ram")
        console.log("pasaccesswoToken",pasaccesswoToken)
        return pasaccesswoToken;
    } catch (error) {
        throw new ApiError(420, "You are not registered with us , please register with us .");
    }
}


const genrateOtp = function(){
    const characters = '0123456789' ; 
    let result = '';

    for (let i = 0; i < 6 ; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result ; 
}

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
    console.log("radha")
    const {fullname ,email , password ,confirmPassword, username , schoolName,schoolAddress,schoolMobile, adminMobile,profileImage,schoolImage} = req.body      ; 
    
    if ([fullname, email, password, confirmPassword, schoolName, schoolAddress, schoolMobile, adminMobile, profileImage, schoolImage].some((field) => typeof field === 'string' && field.trim() === "")) {
        throw new ApiError(400, "All fields are required ");
    }
    
   console.log(typeof(req.body.schoolMobile))
   const existedAdmin = await Admin.findOne({
    $and:[{email},{username}]
   })

   if(existedAdmin){
    throw new ApiError(400,"Admin already exist")
   }

   if(password!=confirmPassword){
    throw new ApiError(401,"Invalid Credentials{password and confirm password should be same}")
   }
   console.log(req.body)
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
    schoolAddress,
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
    const {oldPassword, newPassword} = req.body
    console.log(oldPassword,newPassword)
    const User = await Admin.findById(req.theAdmin?._id);
    if (!User){
        throw new ApiError(404,"User not found")
    }
    // chek if password is correct
    console.log("server run")
    const validation = await User.isPasswordCorrect(oldPassword)
    // chekckung the validation 
    if (!validation){
        return res.status(400).json(new ApiResponse(400, {}, "Old Password is incorrect"))
    }
    console.log("client run")
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

    //will do tommoworow not in mvp  but still we will write 

})
const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponse(
        200,
        {
            Admin : req.theAdmin
        },
        "Admin Details fetched Sucessfully"
    ))
})
const forgetPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(200,"please enter a valid email address")
    }
    const success = await Admin.findOne({ email: email });
    console.log(success)
    if(!success){
        throw new ApiError(200,"you are not authorised user , please use valid credentials as Email id and Password"
        )
    }
    const fullname = success.fullname
    const otp = genrateOtp()
    const  theOTP = await OTP.create({
        email,
        otp
    })
    const theId = theOTP._id
    await sendOtpMail(email,otp,fullname)
    console.log("sita ram")
    const pasaccesswoToken = await genrateAccessTokenForPasswordReset(theId)
    console.log("janki",pasaccesswoToken)
    console.log("jaanki raani")
    
    const options = {
        httpOnly : true ,
        secure : true
    }

    return res.status(201)
    .cookie("pasaccesswoToken", pasaccesswoToken, options)
    .json(
        new ApiResponse(200,{
            token : pasaccesswoToken
        },"Email validated as Registered User and OTP sent sucessfully.")
    )

})
const ValidatedOtp = asyncHandler(async(req,res)=>{
    const {otp} = req.body
    console.log(otp)
    const token = req.cookies?.pasaccesswoToken || req.header("Authorization")?.replace("Bearer ","")
    console.log("token",token)
    if(!token){
        throw new ApiError(400,"Unauthorised request")
    }
    const decodedToken = jwt.verify(token, process.env.PASSWORD_CHANGE_TOKEN_SECRET)
    console.log("decoded token",decodedToken)
    const theOtp = decodedToken.otp
    const theEmail = decodedToken.email
     if(theOtp==otp){
        console.log("verified")
     }
     else{
        throw new ApiError(400,"Invalid OTP")
     }
    return res.status(200)
    .json(
        new ApiResponse(200,{
            tokeny:decodedToken
        },"otp verified now please resset your password.")
    )
})

const changeforgettonPassword = asyncHandler(async(req,res)=>{
    const {newPassword} = req.body
    const email = req.email
    console.log("email",email)
    const User = await Admin.findOne({ email: email });
    if (!User){
        throw new ApiError(404,"Couldn't find User")
    }
    User.password = newPassword
    await User.save({validateBeforeSave: false})
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .clearCookie("pasaccesswoToken", options)
    .json(new ApiResponse(
        200,
        {},
        "Password changed successfully"
    ))
    
})

export {registerAdmin,
        adminLogin,
        logOutAdmin,
        changePassword, 
        updateRefreshToken,
        getCurrentUser,
        forgetPassword,
        ValidatedOtp,
        changeforgettonPassword
}































