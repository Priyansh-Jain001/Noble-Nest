// dotenv is a npm pacakge which helps us to integrate the .env file with our backend
if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
    // console.log(process.env);
}

const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require('ejs-mate');
// const ejsLint = require("ejs-lint");
const Listing = require("./models/listing.js")
const User = require("./models/user.js");
// const schemaValidation = require("./schema.js");
const expressError = require("./utilities/expressError.js");
const cookieParser = require("cookie-parser"); 
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local")


 



// requring the router
let listings = require("./routers/listing.js");
let users = require("./routers/user.js");



const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Connect our mongodb online(mongo atlas)
let DB_URL = process.env.ATLASDB_URL;



main()
.then((res)=> {
    console.log("Connection Successful");
})
.catch((err)=> {
    console.log("Connection Failed");
});

async function main(){
    await mongoose.connect(DB_URL);
}

const port = 8080;

let store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto:{
        secret: process.env.SECRET, 
    },
    touchAfter: 3600,
})

store.on("error", ()=>{
    console.log("Error in mongo session store", err)
})

const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}



// using session & flash
app.use(session(sessionOptions));
app.use(flash());

// Authentication
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());  // saves user realted info into sesison
passport.deserializeUser(User.deserializeUser());  // generate a function to deserialise user once session ends

// flash middleware
app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error")
    res.locals.currUser = req.user;
    next();
})

app.get('/' ,(req,res)=>{
    res.send("working");
})

// using router\
app.use("/home", listings);
app.use("/home/user", users);


app.all("*", (req, res, next)=>{
    next(new expressError(404, "Page Not Found!"));
});


// Error Handling Middleware
app.use((err, req, res, next)=>{
    let {statusCode=500, message="Something went wrong!"} = err;

    // res.status(statusCode).send(message);
    res.status(statusCode).render("errors/error.ejs", {message});
})


app.listen(port, ()=>{
    console.log("connection successfull");
})