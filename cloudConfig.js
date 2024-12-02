const cloudinary = require('cloudinary').v2; // we are using the cloudinary version 2 v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// after requiring we will configure
cloudinary.config({
    cloud_name : process.env.CLOUDNAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// defines our storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Real_Estate_PropImages', // Specify your desired folder here
        allowed_formats: ['jpeg', 'png', 'jpg', 'svg', 'webp'], // Specify allowed formats
    }
});

module.exports = { storage }