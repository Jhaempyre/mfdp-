import mongoose , {Schema} from "mongoose";

const paymentSchema = new Schema({
    razorpay_order_id :{
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
    amount: {
        type:String,
        required:true,
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

const Payment = mongoose.model("Payments", paymentSchema);

export default Payment ;