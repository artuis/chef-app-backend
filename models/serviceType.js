const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceTypeSchema = new Schema({
    name : { type: String, required: true}
})

const ServiceType = mongoose.model("ServiceType", serviceTypeSchema);

module.exports = ServiceType;