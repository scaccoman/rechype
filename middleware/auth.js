var User           = require("../models/user");
var Receipt        = require("../models/receipt");
var Preference        = require("../models/preference");

var middlewareObj = {};

//MIDDLEWARE TO RESTRIC ACCESS TO SPECIFIC PAGES
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/login");
};

middlewareObj.isNotLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        res.redirect("back");
    }
    return next();
};

// //CHECK COMMENT OWNERSHIP MIDDLEWARE
// middlewareObj.checkCommentOwnership = function(req, res, next) {
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if (err){
//                 req.flash("error", "Campground not found");
//                 res.redirect("back");
//             } else {
//                 //does user own the campground?
//                 if(foundComment.author.id.equals(req.user._id)){
//                     next();
//                 } else {
//                     req.flash("error", "You don't have permission to do that");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("back");
//     }
// };

//CHECK RECEIPT OWNERSHIP MIDDLEWARE
middlewareObj.checkReceiptOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Receipt.findById(req.params.id, function(err, foundReceipt){
            if (err){
                console.log(err);
                res.redirect("back");
            } else {
                if(foundReceipt.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

//CHECK PREFERENCES OWNERSHIP MIDDLEWARE
middlewareObj.checkPreferenceOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Preference.findOne({authorId: req.user.id}, function(err, foundPreference){
            if (err){
                console.log(err);
                res.redirect("back");
            } else {
                if(foundPreference.authorId.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("/auth/login");
    }
};

module.exports = middlewareObj;