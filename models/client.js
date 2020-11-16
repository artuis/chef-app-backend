const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name : { type: [String], required: true},
    contactInfo : {
        type : Map,
        of : String
    },
    location : { type: String, required: true},
    currentChefId : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Chef"
        }
    ],
    pastChefId : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Chef"
        }
    ]
})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;