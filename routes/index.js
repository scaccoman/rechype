var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Receipt = require("../models/receipt");
var Preference = require("../models/preference");
var auth = require("../middleware/auth.js");


router.get("/", function(req, res) {
    res.redirect("/home");
});

router.get("/home", function(req, res) {
    res.render("home.ejs");
});

router.get("/cookies-handler", function(req, res) {
    var cookieId = req.query.cookie;
    console.log(cookieId);
    res.send("Error");
})

router.get("/disclaimer", function(req, res) {
    res.render("disclaimer.ejs");
});

router.get("/receipts/new", auth.isLoggedIn, function(req, res) {
    res.render("new.ejs");
});

router.post("/search", function(req, res) {
    var searchConditions = req.body.searchBox.toLowerCase();
    if (searchConditions === "") {
        res.redirect("back");
    }
    Receipt.search(searchConditions, function(err, foundReceipts) {
        if (err){
            console.log(err);
            res.redirect("back"); 
        } else {
            console.log(foundReceipts);
            res.render("search.ejs", {receipts: foundReceipts, searchConditions: searchConditions});
        }
    });
});

//==============
//START RECIPES AJAX ROUTES
//==============

router.get("/data",function(req, res){
    Receipt.find({}, function(err, foundReceipts) {
        if (err) {
            res.json({"error": "Error while getting your receipt yo the DataBase, please refresh the page"});
        } else {
            var receiptsStr = JSON.stringify(foundReceipts);
            res.json(receiptsStr);
        }
    });
});

router.post("/data", auth.isLoggedIn, function(req, res){
    //PROCESS INCOMING AJAX STRINGIFIED OBJ
    var bodyStr = JSON.stringify(req.body);
    var bodyObj = JSON.parse(bodyStr);
    //PROCESS INCOMING AJAX STRINGIFIED OBJ
    bodyObj.author = {
        id: req.user._id,
        username: req.user.username
    };
    Receipt.create(bodyObj, function(err, newReceipt){
        if (err) {
            console.log(err);
            res.json({"error": "Error while adding your receipt yo the DataBase, please try again"});
        } else {
            res.json({"message": "New Receipt added correctly, you can start cooking"});
        }
    });
});

//==============
//END RECIPES AJAX ROUTES
//==============

router.get("/personalData", auth.isLoggedIn, function(req, res){
    Receipt.find({ 'author.id': req.user.id }, function(err, foundReceipts) {
        if (err) {
            res.json({"error": "Error while getting your receipt yo the DataBase, please refresh the page"});
        } else {
            var receiptsStr = JSON.stringify(foundReceipts);
            res.json(receiptsStr);
        }
    });
});

router.get("/getSettings", function(req, res){
    if (req.user) {
        Preference.findOne({authorId: req.user.id}, function(err, userPreference) {
            if (err) {
                res.json({"error": "Error while fetching your preferences, please refresh the page"});
            } else {
                if (!userPreference){
                    var defaultPreference = {
                            backgroundColor: "#F6F6F6",
                            fontFamily: "",
                            authorId: req.user.id
                        };
                    Preference.create(defaultPreference, function(err, preference){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("default preferences generated successfully");
                        }
                    });
                }
                // var preferenceStr = JSON.stringify(userPreference);
                res.json(userPreference);
            }
        });
    } else {
        res.json({"message": "no user currently logged in, login to view your settings"});
    }
});

//==============
//START SETTINGS AJAX ROUTES
//==============
router.get("/settings", auth.checkPreferenceOwnership, function(req,res){
    Preference.findOne({authorId: req.user.id}, function(err, userPreference){
        if (err){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("settings", {preferences: userPreference});
        }
    });
});

//CHANGE ISLOGGEDIN WITH PREFERENCE OWNERSHIP CHECK
router.post("/settings", auth.checkPreferenceOwnership, function(req,res){
    Preference.findOneAndUpdate({authorId: req.user.id}, req.body, {new: true}, function(err, updatedPreferences){
        if (err) {
            console.log(err);
            res.json({"error": "Error while saving your settings, please try again"});
        } else {
            res.json({"message": "Settings saved correctly"});
        }
    });
});
//==============
//END SETTINGS AJAX ROUTES
//==============

module.exports = router;