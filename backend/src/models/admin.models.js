import mongoose from "mongoose";
import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const adminSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        unique:true,
        lowercase :true,
        trim:true,
    },

     //This is same as school email as all the authentication is done
    //from this email please don't use personal email
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase :true,
        trim:true,
    },

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase :true,
        trim:true,

    },

    password:{
        type: String,  
        required:[true,"Passowrd caahiye re baba"]
    },

    schoolname:{
        type:String,
        required:true,
        trim:true,
    },

    schooluniquecode:{
        type:String,
        required:true,
        trim:true,
    },

    //country /houseno, street-name ,/area/block /locality /sector, district , state , pincode 
    schooladress:{
        type:String,
        required:true,
        trim:true,
    },

    schoolmobile:{
        type:Number,
        required:true,
        trim:true,
    },

    //this will be required for sms and whatsapp communication

    adminmobile:{
        type:Number,
        required:true,
        trim:true,
    },

    profileImage:{
        type:String ,//cloudnary url
        //required is made false
        required:true
    },

    schoolImage:{
        type:String,
    },

    refreshToken:{
        type :String

    }

},
{
    timeseries:true,
    timestamps :true
})

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,11)
    next()
})


userSchema.methods.genrateAccessToken = function()
{
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.genrateRefreshToken = function()
    {
        return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

const Admin = mongoose.model("Admin", adminSchema);

export default Admin