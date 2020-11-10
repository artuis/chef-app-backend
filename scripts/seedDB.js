const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/chefDB"
);

const cuisineSeed = [
    {name: "Italian"}, 
    {name: "Thai"}
]
// const chefSeed = []
// const serviceTypeSeed = []
// const clientSeed = []

db.Cuisine.remove({})
    .then(() => db.Cuisine.insertMany(cuisineSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });