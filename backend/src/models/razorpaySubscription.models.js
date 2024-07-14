import mongoose , {Schema} from "mongoose";

const subPaymentSchema = new Schema({
    razorpay_subscription_id :{
        type: String,
        required: true,
    },
    razorpay_payment_id :{
        type: String,
        required: true,
        },
    razorpay_signature :{
        type: String,
        required: true,
        },
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    schoolUniqueCode:{
        type:String,
        required:true,
    }    
},{
    timeseries:true,
    timestamps:true})

const subPayment = mongoose.model("SubPayments", subPaymentSchema);

export default subPayment ;