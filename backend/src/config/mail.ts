import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  export const sendEmail = async (to:string, subject:string, body:string) => {
    try {
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            html: body,
          });
          console.log("Message sent:");   
    } catch (err) {
        console.error("Email send failed:", err);
    }
    
  }