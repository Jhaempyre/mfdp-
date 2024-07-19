import mongoose,{Schema} from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const maintenanceStaffSchema = new Schema({
    name: {
         type: String,
         required: true
         },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        },
    image:{
        type:String,
        default:""
    },
    dateOfBirth:{
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
    maintenanceSkills:{
        type:String,
    },
    schoolUniqueCode:{
        type:String,
        required : true
    ,}     
},{
    timeseries:true,
    timestamps:true})

const maintinanceStaff = mongoose.model("Maintinance Staff",maintenanceStaffSchema)   

export default maintinanceStaff
