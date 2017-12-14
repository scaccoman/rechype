var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var flash = require("connect-flash");
var passport = require("passport");
var flash    = require('connect-flash');
var morgan       = require('morgan');
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
//setup recipe model, comment and user schema from external js file
var User           = require("./models/user");
var Receipt        = require("./models/receipt");
var Preference = require("./models/preference");
//EXTERNAL ROUTES
var index       = require("./routes/index");
var receipt     = require("./routes/receipts");
//middleware
var auth = require("./middleware/auth.js");
//db config load
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
mongoose.Promise = global.Promise;

require('./config/passport')(passport); // pass passport for configuration

//App configuration
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use("/", router);
app.set("view engine", "ejs");


// PASSPORT SETUP
app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//middleware to pass an object to all the routes (user to show login, singup and logout depending on the user state)
app.use(function(req, res, next){
    res.locals.user = req.user; //BROKEN, to investigate. returning empty string for now
    res.locals.currentUser = req.user;
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

require('./routes/auth.js')(app,passport);
require('./routes/connect.js')(app,passport);
require('./routes/unlink.js')(app,passport);
app.use(index);
app.use("/receipts", receipt);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Recipe server running..");
});