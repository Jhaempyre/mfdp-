import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import Admin from "../models/admin.models.js";
import Payment from "../models/razorpayPayment.models.js"
import { sendEmail } from "../utils/sendEmail.js";
import { instance } from "../server.js"
import crypto from "crypto";



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
            // on the server side we will chek if the payment is received by getting elemnt order
            //order.status if it is possitive or true we will do one thing we will redirect to succes page 
            //once we will find that the requestd is null then wee will simply change the frontend to the failure page with the back to home button
            
        console.log("we reached here")
        res.redirect(`http://localhost:5173/dashboard/Latest_Update/${username}`)

        }else{
            throw new ApiError(400,"something went wrongTry again , if the amount is debiteed will be refunded in 7 days")
        }
    } catch (error) {
        console.log(error)
    }
})

export {checkOut,
    paymentVerification
}