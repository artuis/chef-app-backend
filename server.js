const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config()

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors(
    {
        origin : "https://experience-indulgence.herokuapp.com",
        optionsSuccessStatus: 200
    }
));

// app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/chefDB",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});