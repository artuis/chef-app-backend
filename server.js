const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/chefDB",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});