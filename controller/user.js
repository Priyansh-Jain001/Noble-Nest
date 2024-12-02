let Listing = require("../models/listing.js");
const Image = require("../models/images.js");
const User = require("../models/user.js");

const Otp = require("../otp model/otp.js");

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// function to generate the random otp
function otpGeneration(email){

    // Generate a numeric-only OTP
    let otp = otpGenerator.generate(6, {
        digits: true,           // Use digits
        lowerCaseAlphabets: false, // Exclude lowercase alphabets
        upperCaseAlphabets: false, // Exclude uppercase alphabets
        specialChars: false,     // Exclude special characters
    });
    sendMail(otp, email)
    return otp;
}

// Create a transporter
function sendMail(otp, email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'realestate010100@gmail.com', // Replace with your email
          pass: 'qtzb ryve crkl tjgu', // Replace with your email password or app password
        },
      });
      
      // Email options
      const mailOptions = {
        from: 'realestate010100@gmail.com',         // Sender's email
        to: `${email}`,   // Recipient's email
        subject: 'Hello from NobleNest',    // Email subject
        text: `Your OTP is ${otp} `, // Email body (plain text)
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

// render signup from 
module.exports.renderSignup = (req,res)=>{
    res.render("user/signup.ejs", { layout: 'layouts/boilerplate', excludeFooter: true });
}

// post signup form
module.exports.postSignup = async (req, res)=>{
    req.session.formData = {...req.body.user};
    console.log(req.session.formData);
    // otpGeneration()

    let otp = otpGeneration(req.session.formData.email);
    console.log(otp)

    let newOtp = new Otp({
      otp: otp
    })

    await newOtp.save();
    console.log("new otp is ",newOtp)

    res.redirect("/home/user/otp");
}
// get otp
module.exports.getOtp = (req, res)=>{
    res.render("user/otp.ejs", {excludeFooter: true});
}

// post otp
module.exports.postOtp = async (req, res)=>{
    let data = {...req.session.formData};
    console.log("form data is: ", data);
    let password = data.password;
    console.log(password);

    let {otp} = req.body;
    console.log(otp);

    let otpData = await Otp.findOne({otp: otp});
    console.log(otpData);

    if(otpData == null){
        req.flash("error", "Entered OTP is Incorrect")
        res.redirect("/home/user/signup");
        return;
    }
    // console.log("otp fom database :", otpData.otp)
    // let otpDataBase = otpData.otp;

    if( otp == otpData.otp){

        let newUser = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            username: data.username,
            password: data.password,
        })

        let registerUser = await User.register(newUser, password);
        console.log(registerUser);

        await Otp.deleteOne({otp: otp});

        // as user get registered it automatically gets logged in
        req.login(registerUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", `signed in successfull!`)
        res.redirect("/home");
    }) 
    }

}

// render login
module.exports.renderLogin = (req,res)=>{
    res.render("user/login.ejs", { layout: 'layouts/boilerplate', excludeFooter: true })
}

// post login
module.exports.postLogin = async (req, res)=>{
    let { username } = req.body;
    // console.log(req.session);
    req.flash("success", `${username} logged in!`)
    if(!res.locals.redirectUrl){
        res.redirect("/home");
        return;
    }
    res.redirect(res.locals.redirectUrl);
}

// logout
module.exports.logout = (req, res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }

        req.flash("success", "Logged Out Successfully");
        res.redirect("/home");
    })
}