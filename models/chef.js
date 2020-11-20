const mongoose = require("mongoose");
const { checkout } = require("../routes");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const chefSchema = new Schema({

    first: { type: String, required: true, trim: true },
    last: { type: String, required: true, trim: true },

    profilePic : { type: String },
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
    restaurants : [{ type : String, required: true }],
    contactInfo : {
        type : Map,
        of : String
    },
    zipcode : { type : String },
    username : { type : String },
    username_lower : { type : String},
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
    ],
    photos : [
        {
            type: [Schema.Types.ObjectId],
            ref: "Photo"
        }
    ]
});

chefSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;