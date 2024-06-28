import dotenv from "dotenv"

import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/database.js"
import { app } from "./app.js"
import Razorpay from "razorpay";

dotenv.config({
    path:'./env'
})


//connecting to databse and spining up the server 
console.log("ram")
connectDB().then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`server is runnning at ${process.env.PORT}`)
    } ) 
})
.catch((err)=>{
    console.log("mongo db connnection failuree!!!",err);
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_KEY_SECRET,
})