import mongoose,{Schema} from 'mongoose'

const securityPersonnelSchema = new Schema({
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
    }     
},{
    timeseries:true,
    timestamps:true})

const securityPers = mongoose.model("Security Personnel",securityPersonnelSchema)   

export default securityPers
