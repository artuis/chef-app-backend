const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

// app.use(cors(
//     {
//         origin : "http://localhost:3000",
//         optionsSuccessStatus: 200
//     }
// ));

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/chefDB",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});