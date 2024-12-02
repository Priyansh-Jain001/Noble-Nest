const express  = require("express");
const Listing = require("../models/listing.js");
const Image = require("../models/images.js")
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync.js");
let { isLoggedIn } = require("../middleware/middleware.js");


// const session = require("express-session");

// const sessionOptions={
//     secret: "RealStateMain",
//     resave: false,
//     saveUninitialized: true,
// }

// app.use(session(sessionOptions));

// multer for parsing the multipart/form data
const multer  = require('multer')

// requiring cloudinary and storage 
const {storage} = require('../cloudConfig.js');

const upload = multer({storage})  //initialize

let listingController = require("../controller/listing.js");

// home
router.get("/", wrapAsync(listingController.home));

//home about
router.get('/about', listingController.about);

//contact us
router.get('/contactUs', isLoggedIn, listingController.contact);

// all listings
router.get('/listings' , isLoggedIn, wrapAsync(listingController.allListing));

// rent
router.get("/listings/rent", wrapAsync(listingController.rent));

// shops & malls
router.get("/listings/shops&malls", wrapAsync(listingController.shopsMalls));

// flats & buildings
router.get("/listings/flats&buildings", wrapAsync(listingController.flatsBuildings));

// show property
router.get("/listings/:id", isLoggedIn, listingController.showProperty);


// find your perfect choise(search)
router.post("/search", isLoggedIn, wrapAsync(listingController.search))

router.get("/choise", isLoggedIn, (req, res)=>{
    res.render("listings/choise.ejs")
})

//delete route
router.delete("/:id", wrapAsync(listingController.delete));


// Post Property
// new 
router.get('/new', isLoggedIn, listingController.new)

//next page(address)
router.post("/address", listingController.addressDetails);

// pricing page after address page
router.post("/pricing", listingController.pricingDetails);

// prop_detail page after pricing page
router.post("/prop_details", listingController.propDetails);

// image uploading form
router.post("/upload_image",listingController.uploadImage)

// post new property
router.post("/newProp", upload.single('image[mainImage]'), listingController.newProp);


router.get("/edit/:id", wrapAsync(listingController.edit));

router.put("/updateinfo/:id", wrapAsync(listingController.updateInfo));

 //upload image path
 router.get("/upload/:id", wrapAsync(listingController.renderUploadImages))

router.post("/upload/:id", upload.single("image[mainImage]"), wrapAsync(listingController.uploadImages))


//My Account
router.get("/myAccount", isLoggedIn, wrapAsync(listingController.myAccount))

module.exports = router;