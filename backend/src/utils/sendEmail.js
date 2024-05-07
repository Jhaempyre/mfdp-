import nodemailer from "nodemailer"

const sendEmail = async(email,fullname,accessKey)=>{
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
            <style>
              /* Global styles */
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                text-align: center;
              }
              p {
                color: #666;
                margin-bottom: 20px;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 3px;       
                transition: background-color 0.3s;
              }
              .button:hover {
                background-color: #0056b3;
              }
            </style>
            </head>
            <body>
            
            <div class="container">
              <h1>Welcome to EdTech!</h1>
              <p>Dear ${fullname},</p>
              <p>On behalf of the entire team at EdTech, I would like to extend a heartfelt welcome to you and your esteemed institution to our family! We are thrilled to have you onboard as part of our growing community.</p>
              <p>At Karizma, we understand the immense responsibility that comes with managing a school, and we are committed to providing you with the tools and support you need to streamline your administrative processes and enhance the learning experience for your students.</p>
              <p>As you embark on this journey with us, we want to express our gratitude for choosing our ERP solution to meet your school's needs. Your trust in us is deeply appreciated, and we are dedicated to exceeding your expectations every step of the way.</p>
              <p>To help you get started, we have enclosed your admin access key below:</p>
              <p><strong>Admin Access Key:</strong> ${accessKey}</p>
              <p>Please keep this key secure, as it grants you access to the powerful features and functionalities of our ERP software. Should you have any questions or require assistance at any point, our team of experts is here to support you.</p>
              <p>We look forward to a fruitful partnership and to witnessing the positive impact that [Your School ERP Software Name] will have on your institution. Together, we can transform education and empower future generations.</p>
              <p>Once again, welcome to the EdTech family!</p>
              <p>Warm regards,</p>
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
        console.log("message sent")
        return mailresponse;

    } catch (error) {
        console.log(error.message)
    }
   
}

export default sendEmail