var express = require("express");
var router = express.Router();
var Receipt = require("../models/receipt");
var Preference = require("../models/preference");
var auth = require("../middleware/auth.js");

router.get("/my", auth.isLoggedIn, function(req, res) {
            res.render("myRecipes.ejs");
});

//SHOW ROUTE
router.get("/:id", function(req, res) {
    Receipt.findById(req.params.id, function(err, foundReceipt){
        if (err){
            console.log(err);
            res.redirect("/home");
        } else {
            res.render("show.ejs", {receipt: foundReceipt});
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", auth.checkReceiptOwnership, function(req, res) {
    Receipt.findById(req.params.id, function(err, foundReceipt){
        if (err){
            console.log(err);
            res.redirect("/receipts/" + req.params.id);
        } else {
            res.render("edit.ejs", {receipt: foundReceipt});
        }
    });
});

//USING JQUERY
//UPDATE ROUTE
router.put("/:id", auth.checkReceiptOwnership, function(req,res){
    var bodyStr = JSON.stringify(req.body);
    var bodyObj = JSON.parse(bodyStr);
    Receipt.findByIdAndUpdate(req.params.id, bodyObj, function(err, updatedReceipt){
        if(err){
            console.log(err);
            res.json({"error": "Error while adding your receipt yo the DataBase, please try again"});
        } else {
            res.json({"message": "Receipt modified correctly, you will now be redirected to the home page"});
        }
    });
});

//USING JQUERY
//DELETE ROUTE
router.delete("/:id", auth.checkReceiptOwnership, function(req, res) {
    Receipt.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.send("Error" + req.params.id);
        } else {
            res.render("home");
        }
    });
});

module.exports = router;