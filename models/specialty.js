const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialtySchema = new Schema({
    name : { type: String, required: true }
})

const Specialty = mongoose.model("Specialty", specialtySchema);

module.exports = Specialty;