import mongoose,{Schema} from "mongoose";

const updateSchema = new Schema ({
    schoolUniqueCode:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    },
    tittle:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Update = mongoose.model("Update", updateSchema);

export default Update
