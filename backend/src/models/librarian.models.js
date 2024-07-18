import mongoose,{Schema} from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const librarianSchema = new Schema({
    name: {
         type: String,
         required: true
         },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        default:""
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        },
    education:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    },
    dateOfBirth:{
        type:String,
        required:true,
    },
    Specialization:{
        type:String
    },
    certifications:{
        type:String
        },
    references:{
        type:String,  
    },
    emergencyContact:{
        type:String,
        required:true
    },
    medicalInfo:{
        type:String,
        required:true
    },
    salary:{
        type:String,
    },
    schoolUniqueCode:{
        type:String,
        required : true
    },
    cataloggingSkills:{
        type:String,
    }     
},{
    timeseries:true,
    timestamps:true})

const librarian = mongoose.model("Librarian",librarianSchema)   

export default librarian
