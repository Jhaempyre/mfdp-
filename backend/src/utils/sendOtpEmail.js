import { ApiError } from "./ApiError.js";
import nodemailer from "nodemailer"


const sendOtpMail = async(email,otp,fullname)=>{
    try {
        const transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: process.env.EMAILUSER ,
              pass: process.env.EMAILPASSWORD
            }
          });
        const mailOptions = {
            from: " noreply@demomailtrap.com",
            to: email,
            subject: "Welcome to Edtech",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to [Your School ERP Software Name]!</title>
            </head>
            <body>
            
            <div class="container">
              <h1>We are sorry to hear You forgot your password.</h1>
              <p>Hi ${fullname},</p>
              <p>Confirm Your email is : ${email}</p>
              <p>Don't worry, we got you covered. Your OTP is: ${otp}</p>
              <p>Enter this OTP to reset your password.</p>
              <p>Please report to us immediately on our Helpline number if the Password reset request is not initiated by you.
              <br>
               we value your privacy and our students data's integrity at top.
              </p>
              <p>please chooose a stronger password 
              <br>
              that contains all alphanumeric and special characters : [a-z][A-Z][0-9][~!@#$%^&*()_+={}[]\|:":",.<>/?/]
              </p>
              <p>Best regards,</p>
              <p>Aashish Jha<br>
              CEO<br>
              Edtech<br>
              Jhaempire.com</p>
            </div>
            
            </body>
            </html>
            `
        }
        const mailresponse = await transport.sendMail
        (mailOptions);
        console.log("otp message sent")
        return mailresponse;      
        
    } catch (error) {
      console.log(error.message)
      throw new ApiError (500,{
        error: "Couldn,t request otp , Please try again laterinnternal server error"})
    }
}

export default sendOtpMail