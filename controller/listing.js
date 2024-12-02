let Listing = require("../models/listing.js");
const Image = require("../models/images.js");
const User = require("../models/user.js");

module.exports.home = async (req,res)=>{
    let allListing = await Listing.find().populate("images").populate("owner"); 
    console.log(allListing);
    res.render("listings/home.ejs", {allListing});
}

module.exports.about = (req, res)=>{
    res.render("listings/about.ejs");
}

module.exports.contact = (req, res)=>{
    res.render("listings/contact.ejs");
}

module.exports.allListing = async (req,res)=>{
    let allListing = await Listing.find();
    console.log(allListing);

    res.render('listings/listing.ejs', {allListing});
    // res.send("abc");
}

module.exports.showProperty =  async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        console.log(req.user.username)

        // Fetch the listing and populate the 'images' field
        const data = await Listing.findById(id).populate("images").populate("owner");
        let obj = data.images
        // let username = data.owner.username;
        // console.log(username);
        // console.log(obj)
        // console.log("length: ", obj.length);

        

        if (!data) {
            return res.status(404).send("Listing not found");
        }

        console.log("Populated Listing:", data);

        // Render the listing page with populated data
        res.render("listings/property.ejs", { data, obj });
        
    } catch (error) {
        console.error("Error in /listings/:id:", error);
        res.status(500).send("An error occurred while fetching the listing.");
    }
}

module.exports.delete = async(req, res)=>{
    let { id } = req.params;
    // console.log(id);
    let listing = await Listing.findById(id).populate("owner");
    if(req.user.username == listing.owner.username){
        await Listing.findByIdAndDelete(id);
    }
    else{
        req.flash("error", "you are not the owner")
    }
    res.redirect("/home")

}

// Post property
// new
module.exports.new = (req, res)=>{
    res.render("postProperty/basicDetails.ejs",  { layout: 'layouts/boilerplate', excludeFooter: true })
}

// next page(address)
module.exports.addressDetails =  (req, res)=>{
    req.session.formData = {...req.body}; // stores the form data as object in req.session.formData
    // console.log(req.session.formData);
    res.render("postProperty/addressDetails.ejs",  { layout: 'layouts/boilerplate', excludeFooter: true })
}

//pricing page
module.exports.pricingDetails = (req, res)=>{
    let address = req.body;

    // creating a address object from the details extracted from the form data
    let obj = {
        address  
    }

    // console.log(obj);
    req.session.formData = {...req.session.formData, ...obj};
    // console.log(req.session.formData)
    res.render("postProperty/pricingDetails.ejs",  { layout: 'layouts/boilerplate', excludeFooter: true });
}

// prop_detail page after pricing page
module.exports.propDetails = (req, res)=>{
    req.session.formData = {...req.session.formData, ...req.body};
    console.log(req.session.formData);
    res.render("postProperty/prop_Details.ejs",  { layout: 'layouts/boilerplate', excludeFooter: true });
}

// upload image form
module.exports.uploadImage = async (req, res)=>{
    let details = req.body;

    // creating a address object from the details extracted from the form data
    let obj = {
        details
    }

    req.session.formData = {...req.session.formData, ...obj};
    // console.log(req.session.formData);

    // let allData = req.session.formData;
    // console.log(allData);

    // let newListing = await Listing(allData);
    // console.log(newListing)
    // await newListing.save();
    res.render("postProperty/imageDetails.ejs", { layout: 'layouts/boilerplate', excludeFooter: true });
    // res.redirect("/home");
}

// posting new property 
module.exports.newProp =  async (req, res) => {
    try {
        // Fetch form data from the session
        let allData = req.session.formData;
        console.log("Form Data:", allData);

        // File details
        let url = req.file.path;
        let filename = req.file.filename;

        // Create a new listing document
        let newListing = new Listing(allData);

        // Create a new image document
        const newImage = new Image({
            url,
            filename,
        });

        // Save the new image document
        await newImage.save();
        // console.log("New Image saved:", newImage);

        // Add the image reference to the listing
        if (!newListing.images) {
            newListing.images = []; // Initialize if images field is undefined
        }
        newListing.images.push(newImage._id);

        newListing.mainImage = {url, filename};

        // push owner to the listing
        newListing.owner = req.user._id;

        // Save the listing with the associated image
        await newListing.save();
        // console.log(newListing.images)
        console.log("New Listing saved:", newListing);

        res.redirect("/home");
    } catch (error) {
        console.error("Error in /newProp:", error);
        res.status(500).send("An error occurred while creating the property.");
    }
}


// edit proprety
module.exports.edit = async (req, res)=>{
    let {id} = req.params;
    console.log(id);

    let data = await Listing.findById(id)
    console.log(data.title);
    res.render("listings/edit.ejs", {data});
}

// updating the edited form
module.exports.updateInfo = async (req, res)=>{
    let { id } = req.params;
    
    // on the below line we are only updating the info comming from the req body 
    let listing = await Listing.findByIdAndUpdate(id, {...req.body}, {runValidators: true, new: true});

    await listing.save();
    res.redirect(`/home/listings/${id}`);
}

// upload images form show property
module.exports.renderUploadImages = async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    res.render("editProperty/uploadImg.ejs",{id});   
 }

// upload image
module.exports.uploadImages = async(req, res)=>{
    let {id} = req.params;
    console.log(id);

    // File details
    let url = req.file.path;
    let filename = req.file.filename;

    console.log(url, "     ", filename);

    // Create a new image document
    const newImage = new Image({
        url,
        filename,
    });

    // Save the new image document
    await newImage.save();
    console.log("New Image saved:", newImage);

    let listing = await Listing.findById(id);
    listing.images.push(newImage._id);
    await listing.save();


    console.log("Updated listing " ,listing);

    // res.send("working");
    res.redirect(`/home/listings/${id}`)
}

//My Account
module.exports.myAccount = async (req, res)=>{
    let user  = req.user;
    console.log("user is:" , user );

    let username = user.username;

    let userId = user._id;
    console.log("userid is:", userId)

    let allListing = await Listing.find({owner: userId})
    console.log("data is:", allListing);
    res.render("listings/myAccount.ejs", {allListing, username});
}

//search
module.exports.search = async(req,res)=>{
    let {location, property_type, min_budget, max_budget} = req.body;
    console.log(location, " ", property_type, " ", min_budget, " ", max_budget);
    let allListing = await Listing.find({"address.city": location, property_type: property_type, pricing: {$gte: min_budget, $lte: max_budget}});
    console.log(allListing);
    res.render("listings/listing.ejs", {allListing})
    // res.redirect('/home/listings');
    // res.render("listings/choise.ejs");
}

// get flats & buildings
module.exports.flatsBuildings = async(req, res)=>{
    let allListing = await Listing.find({$or: [{property_type: "Flats"}, {property_type: "Buildings"}]});
    console.log(allListing);
    res.render("listings/listing.ejs", {allListing});
}

//get shops & malls
module.exports.shopsMalls = async(req, res)=>{
    let allListing = await Listing.find({property_type: "Shops&Malls"});
    console.log(allListing);
    res.render("listings/listing.ejs", {allListing});
}

module.exports.rent = async(req, res)=>{
    let allListing = await Listing.find({property_type: "Rent"});
    console.log(allListing);
    res.render("listings/listing.ejs", {allListing});
}