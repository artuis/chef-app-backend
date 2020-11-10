const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chefSchema = new Schema({
    name : { type: [String], required: true},
    bio : { type: String, required: true},
    cuisine : [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cuisine"
        }
    ],
    restaurants : { type : String, required: true},
    bioPic : { type : String },
    contactInfo : {
        type : Map,
        of : String
    },
    username : { type : String },
    password : { type : String },
    servedLocations : { type : [String] }
});

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;