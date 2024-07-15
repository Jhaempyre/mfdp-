import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app =  express()

// to permit the cross origin 
/*app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))*/

// to parse the incoming requests with JSON payloads (from req.body)

app.use(express.json({
    limit:"16kb"
}))

// To handle cookies 

app.use(cookieParser())

// to get the url encoding

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.get("/api/getKey",(req,res)=>{
    return res.status(200).json(new ApiResponse(
        200,
        {
            key : process.env.RAZORPAY_API_KEY_ID
        },
        "Key fetched Succesfully"
        
    ))
})

app.use(express.static("public"))//public asset hae jaha 

import adminRouter from "./routes/admin.routes.js"
import updateRouter from "./routes/updates.routes.js"
import healthRouter from "./routes/healthcheck.routes.js"
import paymentRouter from "./routes/payment.routes.js"
import regTeachEmployee from "./routes/teachAndEmployee.routes.js"
import { ApiResponse } from "./utils/ApiResponse.js"


app.use("/api/v1/admin",adminRouter)
app.use("/api/v2/update",updateRouter)
app.use("/api/healthchek",healthRouter)
app.use("/api/v3/raz_pay",paymentRouter)
app.use("/api/v4/reg_teach",regTeachEmployee)

export {app}