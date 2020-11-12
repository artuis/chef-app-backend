const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/chefDB"
);

const cuisineSeed = [
    {name: "American"},
    {name: "Cajun"},
    {name: "Cantonese"},
    {name: "Chinese"},
    {name: "Danish"},
    {name: "Ethiopian"},
    {name: "French"},
    {name: "Filipino"},
    {name: "Greek"},
    {name: "Indian"},
    {name: "Italian"},
    {name: "Japanese"},
    {name: "Keto"},
    {name: "Korean"},
    {name: "Mediterranean"},
    {name: "Mexican"},
    {name: "Thai"},
    {name: "Vegan"},
    {name: "Vegetarian"},
    {name: "Vietnamese"}
];
const serviceTypeSeed = [
    {name: "Hourly"}, 
    {name: "Per Meal"},
    {name: "Per Person"},
]


// const clientSeed = []

db.Cuisine.deleteMany({})
    .then(() => db.Cuisine.insertMany(cuisineSeed))
    .then(data => {
        console.log(data.length + " cuisine records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.ServiceType.deleteMany({})
    .then(() => db.ServiceType.insertMany(serviceTypeSeed))
    .then(data => {
        console.log(data.length + " serviceType records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });