import mongoose,{Schema} from "mongoose";

const allUpdateSchema = new Schema({
    allUpdates:[
        {
            type:Schema.Types.ObjectId,
            ref : "Update",
            default :[]
        }
    ],
    schoolUniqueCode:{
        type:String,
        required:true,
        unique:true
    },
},{
    timestamps:true
})

const AllUpdates = mongoose.model("AllUpdates", allUpdateSchema);

export default AllUpdates ;