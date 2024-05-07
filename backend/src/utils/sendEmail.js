import nodemailer from "nodemailer"

const sendEmail = async(email)=>{
    try {
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAILUSER ,
              pass: process.env.EMAILPASSWORD
            }
          });
        
        const mailOptions = {
            from: "noreply.server.com",
            to: email,
            subject: "Welcome to Edtech",
            html: `<p>Welcome to our world your email is ${email}</p>`
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