import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import Admin from "../models/admin.models.js";
import Payment from "../models/razorpayPayment.models.js"
import sendEmail  from "../utils/sendEmail.js";
import { instance } from "../server.js"
import crypto from "crypto";
import subPayment from "../models/razorpaySubscription.models.js";


const checkOut = asyncHandler(async(req,res)=>{
    console.log("request received from the frontend for One time payment ")
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
          };
        const order = await instance.orders.create(options);
        console.log(order)
        return res.status(201).json(
            new ApiResponse(200,order," Order Created SuccessFully")
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(400,"Error occured during creating order")
    }
})

const paymentVerification = asyncHandler(async(req,res)=>{
    console.log("request received from the frontend for payment verification ")
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
        console.log("Calculated Signature", expectedSignature);
        console.log("order_id",razorpay_order_id)
        const isAuthentic = expectedSignature === razorpay_signature;
        const order = await instance.orders.fetch(razorpay_order_id);
        console.log(order)
        const admen = req.theAdmin
        const username = admen.username
        if(isAuthentic){
        await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                admin:admen._id,
                amount:order.amount,
                schoolUniqueCode:admen.schoolUniqueCode
            })
            //bill banana hae 
            //mail krna hae 
            //payment bill update krna hae database mae 

        console.log("we reached here")
        res.redirect(`http://localhost:5173/PaymentSuccess`)

        }else{
            res.redirect(`http://localhost:5173/PaymentFailure`)
            throw new ApiError(400,"something went wrongTry again , if the amount is debiteed will be refunded in 7 days")
        }
    } catch (error) {
        console.log(error)
    }
})

const subscription = asyncHandler(async(req,res)=>{
    console.log("request received from the frontend for subscription ")
    try {
        const subscription = await instance.subscriptions.create({
            plan_id: process.env.SUBSCRIPTION_PLAN_ID,
            customer_notify: 1,
            quantity: 1,
            total_count: 12,
        })
        console.log(subscription)
        console.log(subscription.id)
        const User = await Admin.findById(req.theAdmin?._id);
        console.log("wor")
        User.razorpay_Subscription_id = subscription.id
        console.log("working")
        await User.save()
        console.log("workedd")
        return res.status(200).json(
            new ApiResponse(200,subscription, "Subscription handled succesfully." )
        )
        
    } catch (error) {
        console.log(error.message)
        throw new ApiError(400,"Subscription couldn't be initiated ")
    }
})

const subPaymentVerification = asyncHandler(async(req,res)=>{
    console.log("request received from the frontend for subscription payment verification ")
    try {
        console.log("nhi kiya")
        const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("sex")
        console.log(req.body)
        const User = await Admin.findById(req.theAdmin?._id);
        const subscription_id = User.razorpay_Subscription_id
        const body = razorpay_payment_id + "|" + subscription_id
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
        console.log("Calculated Signature", expectedSignature);
        const isAuthentic = expectedSignature === razorpay_signature;
        if(!isAuthentic){
            res.redirect(`http://localhost:5173/PaymentFailure`)
            throw new ApiError(400,"Subscription payment verification failed")
        }
        console.log("working")
        //const order = await instance.plans.fetch(razorpay_subscription_id)
        const admen = req.theAdmin
        console.log(admen)
        await subPayment.create({
            razorpay_subscription_id:razorpay_subscription_id,
            razorpay_payment_id:razorpay_payment_id,
            razorpay_signature:razorpay_signature,
            admin:admen.id,
            schoolUniqueCode:admen.schoolUniqueCode,
        })
        console.log("we reached here")
        res.redirect(`http://localhost:5173/PaymentSuccess`)

    } catch (error) {
        throw new ApiError(400,"Couldn't verify the payment , please check and try again later with valid credentials")
    }
})
const cancelSubscription = asyncHandler(async(req,res)=>{
    console.log("request received from the frontend for subscription cancellation ")
    try {
        console.log("will come later on ")
    } catch (error) {
        console.log(error)
        throw new ApiError(400,"Couldn't cancel your subscription , please try again Later")
    }
})
export {checkOut,
    paymentVerification , 
    subscription,
    subPaymentVerification,
    cancelSubscription
}