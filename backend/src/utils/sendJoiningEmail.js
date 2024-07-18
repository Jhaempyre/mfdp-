import { ApiError } from "./ApiError.js";
import nodemailer from "nodemailer";

const sendJoiningMail = async (email, salary, name, schoolName, designation) => {
  try {
    const transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD
      }
    });
    
    const mailOptions = {
      from: "noreply@demomailtrap.com",
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
            <h1>Welcome to ${schoolName}!</h1>
            <p>Hi ${name},</p>
            <p>We are excited to have you join us as a ${designation}.</p>
            <p>Your starting salary will be ${salary}.</p>
            <p>We look forward to working with you and hope you have a great experience with us.</p>
            <p>If you have any questions, feel free to reach out.</p>
            <p>Best regards,</p>
            <p>Aashish Jha<br>
            CEO<br>
            Edtech<br>
            Jhaempire.com</p>
          </div>
        </body>
        </html>`
    };
    
    const mailresponse = await transport.sendMail(mailOptions);
    console.log("Welcome message sent");
    return mailresponse;
    
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, {
      error: "Couldn't send welcome email, please try again later. Internal server error."
    });
  }
};

export default sendJoiningMail;
