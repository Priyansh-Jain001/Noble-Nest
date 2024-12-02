const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    otp:{
        type: String,
    },
})

let Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;