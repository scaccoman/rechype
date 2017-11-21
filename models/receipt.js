var mongoose = require("mongoose");
var searchable = require('mongoose-searchable');

//schema setup

var receiptsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    ingredients: [],
    category: String
});

receiptsSchema.plugin(searchable);

var Campground = mongoose.model("Receipt", receiptsSchema);
module.exports = Campground;