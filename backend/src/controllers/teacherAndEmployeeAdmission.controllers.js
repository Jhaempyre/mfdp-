import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import teacher from "../models/teachers.models.js";

const registerTeacher = asyncHandler(async (req, res) => {
    console.log("Got request from frontend to admit this teacher");

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

    // Send joining email work on utils
    return res.status(201).json(
        new ApiResponse(200, newTeacher, "Teacher Registered Successfully")
    );
});

export { registerTeacher };
