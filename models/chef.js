const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chefSchema = new Schema({
    name : { 
        first: { type: String, required: true, trim: true },
        last: { type: String, required: true, trim: true }
    },
    bio : { type: String },
    cuisine : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Cuisine"
        }
    ],
    specialty : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Specialty"
        }
    ],
    restaurants : { type : String, required: true },
    bioPic : { type : String },
    contactInfo : {
        type : Map,
        of : String
    },
    username : { type : String },
    password : { type : String },
    servedLocations : { type : [String] },
    CurrentClientId : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Client"
        }
    ],
    PastClientId : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Client"
        }
    ]
});

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;