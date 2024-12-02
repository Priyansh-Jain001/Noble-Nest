const express = require("express")
const mongoose = require("mongoose");
const Image = require("./images.js");
const User = require("../models/user.js");
let Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    address:{
        locality:{
            type: String,
        },
        city:{
            type: String,
        },
        country:{
            type: String,
        },
        pincode:{
            type: Number,
            default: 454601
        },
        
    },
    pricing:{
        type: Number,
    },
    contact_no:{
        type: Number,
    },
    property_type:{
        type: String,
    },
    date:{
        type: String,
        default: () => new Date().toLocaleString("en-US"),
    },
    property_for:{
        type: String,
    },
    
    // image:{
    //     mainImage:{
    //         // type: String,
    //         // default: "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif",
    //         // set: (v)=> v === "" ? "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif": v,
           
    //         url: String,
    //         filename: String
    //     },

    //     interiorImage: {
    //         // type: Map, // Allows dynamic keys like img1, img2, etc.
    //         // of: {
    //         //   url: { type: String, required: true },
    //         // },
    //         img1: {
    //             type: String,
    //             default: "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif",
    //             set: (v)=> v === "" ? "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif": v,
    //         },

    //         img2: {
    //             type: String,
    //             default: "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732481693/hall-img-1_vb98tg.webp",
    //             set: (v)=> v === "" ? "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif": v,
    //         },

    //         img3: {
    //             type: String,
    //             default: "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732481770/hall-img-4_t4lavw.webp",
    //             set: (v)=> v === "" ? "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif": v,
    //         },

    //         img4: {
    //             type: String,
    //             default: "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732481693/bathroom-img-5_waoxns.webp",
    //             set: (v)=> v === "" ? "https://res.cloudinary.com/dwzzzllfr/image/upload/v1732200348/4_ugp54e.avif": v,
    //         },
    //     }
    // },

    mainImage:{
        url: String,
        filename: String,
    },
    
    images:[
        {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        }
    ],

    details:{
        carpetArea: {
            type: String,
        },
        age: {
            type: String,
        }, 
        rooms: {
            type: Number,
        },
        bedroom: {
            type: Number,
        },
        bathroom: {
            type: Number,
        },
        balcony: {
            type: Number,
        },
        hall: {
            type: Number,
        },
        status: {
            type: String,
        },
        furnished: {
            type: String,
        },
        loan: {
            type: String,
        },
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

listingSchema.post("findOneAndDelete", async(listing)=>{{
    if(listing){
        await Image.deleteMany({_id: {$in: listing.images}})
    }
    
}})


const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;