const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const clientSchema = new Schema({
    first: { type: String, required: true, trim: true },
    last: { type: String, required: true, trim: true },
    contactInfo : {
        type : Map,
        of : String
    },
    username : { type : String },
    username_lower : { type : String},
    password : { type : String },
    addressId : { 
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    currentChefsId : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Chef"
        }
    ],
    pastChefsId : [
        { 
            type: [Schema.Types.ObjectId],
            ref: "Chef"
        }
    ]
});

clientSchema.pre('save', function(next) {
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

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;