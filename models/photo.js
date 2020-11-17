const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    url : { type: String, required: true },
    title : { type: String, required: true },
    description : { type: String },
    chefId : { 
        type: [Schema.Types.ObjectId],
        ref: "Chef"
    },
    tags : [{ type: String }]
},
{
    timestamps : true
})

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;