module.exports.isLoggedIn =  (req, res, next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        // console.log(req.session.redirectUrl);
        req.flash("error", "Please log in first!");
        return res.redirect("/home/user/login");
    }
    console.log("home");
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}