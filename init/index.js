const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js")

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

const initDB = async ()=>{
    // if any data is available 1stly delete that data and initializing the sample database
    await Listing.deleteMany({});

    await Listing.insertMany(initData.data);

    console.log("Database initialized");
}

initDB();