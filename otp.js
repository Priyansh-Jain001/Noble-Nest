const express = require("express")
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const Otp = require("./otp model/otp.js");
const app = express();

// main() will help our backend to connecvt with mongoDB
main()
.then((res)=>{
    console.log("connection successfull");
})
.catch((err)=>{
    console.log("connection failed");
})

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/RealEstateMain");
}
   

const otpGenerator = require('otp-generator');
// let otp = null;
function otpGeneration(){
    // Generate a numeric-only OTP
    let otp = otpGenerator.generate(6, {
        digits: true,           // Use digits
        lowerCaseAlphabets: false, // Exclude lowercase alphabets
        upperCaseAlphabets: false, // Exclude uppercase alphabets
        specialChars: false,     // Exclude special characters
    });
    sendMail(otp)
    return otp;
}


// Create a transporter
function sendMail(otp){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'realestate300699@gmail.com', // Replace with your email
          pass: 'lchp oypg ezix idbm', // Replace with your email password or app password
        },
      });
      
      // Email options
      const mailOptions = {
        from: 'realestate300699@gmail.com',         // Sender's email
        to: 'sagarsinghal2004@gmail.com',   // Recipient's email
        subject: 'Hello from Nodemailer',    // Email subject
        text: `your otp is ${otp} `, // Email body (plain text)
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}




app.get("/otp", async (req, res)=>{
    let otp = otpGeneration();
    console.log(otp)

    let newOtp = new Otp({
      otp: otp
    })

    await newOtp.save();
    console.log("ne otp is ",newOtp)

    res.send("otp send");
    // res.status(otp).send("otp send")
})

app.listen('3000', ()=>{
    console.log('Listing on port : 3000')
})