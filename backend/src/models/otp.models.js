import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m' // OTP expires in 10 minutes
    }
});

const OTP = mongoose.model('OTP', otpSchema);

otpSchema.methods.genrateAccessToken = function()
{
    return jwt.sign({
        _id:this._id,
        email:this.email,
        otp:this.otp
    },
    process.env.PASSWORD_CHANGE_TOKEN_SECRET,{
        expiresIn:process.env.PASSWORD_CHANGE_EXPIRY
    }
    )
}

export default OTP;