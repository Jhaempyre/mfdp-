import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import teacher from "../models/teachers.models.js";
import accountant from "../models/accountants.models.js";
import sendJoiningMail from "../utils/sendJoiningEmail.js";
import counsellor from "../models/counsellor.models.js";
import librarian from "../models/librarian.models.js";

const registerTeacher = asyncHandler(async (req, res) => {
    console.log("Got request from frontend to admit this teacher");

    try {
        const {
            name, email, phone, address, education,
            experience, subject, dateOfBirth, certifications,
            refrences,  emergencyContact,
            medicalInfo, subjectsTaught, teachingMethodology,
            Specialization, salary , password
        } = req.body;
    
        console.log("got data");
        console.log(req.body);
    
        if ([name, email, phone, address, education,
            experience, subject, dateOfBirth, certifications,
            refrences, emergencyContact,
            medicalInfo, subjectsTaught, teachingMethodology,
            Specialization, salary, password].some((field) => !field || typeof field === 'string' && field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }
    
        const existedTeacher = await teacher.findOne({
            where: { email: email }
        });
    
        console.log("not found");
        console.log(req.file);
    
        if (existedTeacher) {
            throw new ApiError(400, "Teacher already exists");
        }
    
        let imageLocalPath;
    
        if (req.file){
            imageLocalPath = req.file.path;
        }
    
        if (!imageLocalPath) {
            throw new ApiError(400, "Photo is required");
        }
    
        const imageUrl = await uploadOnCloudinary(imageLocalPath, "Profile photo");
        console.log(imageUrl);
    
        const admen = req.theAdmin;
        schoolName = admen.schoolName
        const newTeacher = await teacher.create({
            name,
            email,
            phone,
            address,
            education,
            experience,
            subject,
            image: imageUrl?.url || "",
            schoolUniqueCode: admen.schoolUniqueCode,
            dateOfBirth,
            certifications,
            refrences,
            emergencyContact,
            medicalInfo,
            subjectsTaught,
            teachingMethodology,
            Specialization,
            salary,
            password
        });
        
        await sendJoiningMail(email,salary,name,schoolName,"Teacher")
        // Send joining email work on utils
        return res.status(201).json(
            new ApiResponse(200, newTeacher, "Teacher Registered Successfully")
        );
    } catch (error) {
        console.log(error)
        throw new ApiError(400,`${error.message}`)
    }
});
const registerAccountant = asyncHandler(async(req,res)=>{
    console.log("Got request from frontend to admit this accountant")
    try {
        const {
            name, email, phone, address, education,
            experience, yearOfExperience, dateOfBirth, certifications,
            refrences,  emergencyContact,softwareKnown,
            medicalInfo, Specialization, salary , password
        } = req.body;
        console.log(req.body)
        if ([name, email, phone, address, education,
            experience, yearOfExperience, dateOfBirth, certifications,
            refrences,  emergencyContact,softwareKnown,
            medicalInfo,Specialization, salary , password].some((field) => !field || typeof field === 'string' && field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const existedAccountant = await accountant.findOne({
            where: { email: email }
        });

        console.log("not found");
        console.log(req.file);
    
        if (existedAccountant) {
            throw new ApiError(400, "Accountant already exists");
        }

        let imageLocalPath;
    
        if (req.file){
            imageLocalPath = req.file.path;
        }
    
        if (!imageLocalPath) {
            throw new ApiError(400, "Photo is required");
        }
    
        const imageUrl = await uploadOnCloudinary(imageLocalPath, "Profile photo");
        console.log(imageUrl);
    
        const admen = req.theAdmin;
        const newAccountant = await accountant.create({
            name,
            email,
            phone,
            address,
            education,
            experience,
            subject,
            image: imageUrl?.url || "",
            schoolUniqueCode: admen.schoolUniqueCode,
            dateOfBirth,
            certifications,
            refrences,
            emergencyContact,
            medicalInfo,
            Specialization,
            salary,
            password,
            softwareKnown
        })

        await sendJoiningMail(email,salary,name,schoolName,"Accountant")
        return res.status(201).json(
            new ApiResponse(200, newAccountant, "Accountant Registered Successfully")
        );
    } catch (error) {
        console.log(error)
        throw new ApiError(400,`${error.message}`)
    }
    

})
const registerCounselor = asyncHandler(async(req,res)=>{
    console.log("got request from backend for registering counselor")
    try {
        const {
            name, email, phone, address, education,
            experience, dateOfBirth, certifications,
            refrences,  emergencyContact,
            medicalInfo, Specialization, salary , password
        } = req.body;
        console.log(req.body)
        if([
            name, email, phone, address, education,
            experience, dateOfBirth, certifications,
            refrences,  emergencyContact,
            medicalInfo, Specialization, salary , password].some((field) => !field || typeof field === 'string' && field.trim() === "")) {
                throw new ApiError(400, "All fields are required")
            }
            const existedCounsellor = await counsellor.findOne({
                where: { email: email }
            });
    
            console.log("not found");
            console.log(req.file);
        
            if (existedCounsellor) {
                throw new ApiError(400, "Accountant already exists");
            }
    
            let imageLocalPath;
        
            if (req.file){
                imageLocalPath = req.file.path;
            }
        
            if (!imageLocalPath) {
                throw new ApiError(400, "Photo is required");
            }    
            const imageUrl = await uploadOnCloudinary(imageLocalPath, "Profile photo");
            console.log(imageUrl);
            const admen = req.theAdmin;
            const newCounsellor = await counsellor.create({
                name,
                email,
                phone,
                address,
                education,
                experience,
                dateOfBirth,
                certifications,
                refrences,
                emergencyContact,
                medicalInfo,
                Specialization,
                salary,
                password,
                image: imageUrl?.url || "",
                sschoolUniqueCode: admen.schoolUniqueCode,
            })
            await sendJoiningMail(email,salary,name,schoolName,"Counsellor")
            return res.status(201).json(
                new ApiResponse(200, newCounsellor, "Counsellor Registered Successfully")
            );
        }catch (error) {
            console.log(error);
            throw new ApiError(400,`${error.message}`)

    }
})
const registerLibrarian = asyncHandler(async(req,res)=>{
    console.log("got request from backend for registering librarian")
    try {
        const {
            name, email, phone, address, education,
            experience, dateOfBirth, certifications,
            refrences,  emergencyContact,
            medicalInfo, Specialization, salary , password,cataloggingSkills
        } = req.body;
        console.log(req.body)
        if([
            name, email, phone, address, education,
            experience, dateOfBirth, certifications,
            refrences,  emergencyContact,
            medicalInfo, Specialization, salary , password,cataloggingSkills].some((field) => !field || typeof field === 'string' && field.trim() === "")) {
                throw new ApiError(400, "All fields are required")
            }
            const existedLibrariann = await librarian.findOne({
                where: { email: email }
            });
            if (existedLibrariann) {
                throw new ApiError(400, "Librarian already exists with that email")
                }
            let imageLocalPath;
        
            if (req.file){
                imageLocalPath = req.file.path;
            }
        
            if (!imageLocalPath) {
                throw new ApiError(400, "Photo is required");
            }   
            const admen = req.theAdmin; 
            const imageUrl = await uploadOnCloudinary(imageLocalPath, "Profile photo");
            console.log(imageUrl);
            const newLibrarian = await librarian.create({
                name,
                email,
                phone,
                address,
                education,
                experience,
                dateOfBirth,
                certifications,
                refrences,
                emergencyContact,
                medicalInfo,
                Specialization,
                salary,
                password,
                cataloggingSkills,
                image: imageUrl?.url || "",
                sschoolUniqueCode: admen.schoolUniqueCode,
            })
            await sendJoiningMail(email,salary,name,schoolName,"Librarian")
            return res.status(201).json(
                new ApiResponse(200, newLibrarian, "Librarian Registered Successfully")
            );        
    } catch (error) {
        console.log(error);
        throw new ApiError(400,`${error.message}`)
    }
})
const registerItStaff = asyncHandler(async(req,res)=>{
    console.log("got request from backend for registering IT staff")
})
const registerMaintenanceStaff=asyncHandler(async(req,res)=>{
    console.log("got request from backend for registering maintenance staff")
})
const securityPersonnel = asyncHandler(async(req,res)=>{
    console.log("got request from backend for registering security personnel")
})
export { registerTeacher ,
        registerAccountant , 
        registerCounselor , 
        registerLibrarian,
        registerItStaff,
        registerMaintenanceStaff,
        securityPersonnel
 };
