let JOi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required,
        description: Joi.string().required,
        address:{
            locatity: Joi.string().required,
            city: Joi.string().required,
            country: Joi.string().required,
            pincode: Joi.string().required
        },
        pricing: Joi.string().required,
        contact_no: Joi.string().required,
        property_type: Joi.string().required,
        date: Joi.string().allow("", null),
        // image:{
        //     mainImage: Joi.string().allow("", null),
        //     interiorImage: Joi.string().allow("", null)
        // },
        details:{
            rooms: Joi.string().required,
            carpetArea: Joi.string().required,
            bedroom: Joi.string().required,
            bathroom: Joi.string().required,
            balcony: Joi.string().required,
            hall: Joi.string().required,
            status: Joi.string().allow("", null),
            furnioshed: Joi.string().required,
            loan: Joi.string().allow("", null),
        }
    })
   
})