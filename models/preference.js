var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var PreferenceSchema = new mongoose.Schema({
    backgroundColor: String,
    fontFamily: String,
    authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
});

module.exports = mongoose.model("Preference", PreferenceSchema);