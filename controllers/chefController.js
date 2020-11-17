const db = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//TODO : CREATE, UPDATE, DELETE
//FIND by cuisine type, specialty, service type
//FIND by location

//TODO : 
const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false;
    }
    const token = request.headers.authorization.split(" ")[1]
    const loggedInUser = jwt.verify(token, 'secretString', (err, data) => {
        if (err) {
            return false;
        }
        else {
            return data;
        }
    });
    return loggedInUser;
}

module.exports = {
    findAll: (req, res) => {
        db.Chef
            .find(req.query)
            .select("-password")
            .populate("cuisine")
            .populate("specialty")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByCuisine: (req, res) => {
        db.Chef
            .find({
                cuisine : {
                    $in : mongoose.Types.ObjectId(req.params.id)
                } 
            })
            .select("-password")
            .populate("cuisine")
            .populate("specialty")
            .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        
    },
    findById: (req, res) => {
        db.Chef
            .findById(mongoose.Types.ObjectId(req.params.id))
            .pup
    },
    create: function (req, res) {
        
        // res.send(db.Chef.exists({ username: req.body.username }));

        db.Chef.exists({ username: req.body.username }, function (err, result) {
            //res.send(result);
            req.body.cuisine = req.body.cuisine.map(e => mongoose.Types.ObjectId(e));
            req.body.specialty = req.body.specialty.map(e => mongoose.Types.ObjectId(e));
            if (!result) {
                db.Chef
                    .create(req.body)
                    .then(dbModel => {
                        const userTokenInfo = {
                            username: foundUser.username,
                            _id: foundUser._id,
                            first: foundUser.first,
                            last : foundUser.last
                        }
                        const token = jwt.sign(userTokenInfo, 'secretString', { expiresIn: "2h" });
                        res.status(200).json({ token: token })
                    })
                    .catch(err => res.status(422).json(err));
            } else {
                res.status(422).send("user already exists");
            }
            }
        )
    },
    getCurrentProf: (req, res) => {
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            db.Chef
                .findById(mongoose.Types.ObjectId(loggedInUser._id))
                .select("-password")
                .then(dbModel => {
                    res.status(200).json(dbModel);
                })
                .catch(err => res.status(422).json(err));
        }

    },
    login: (req, res) => {
        db.Chef.findOne({ username: req.body.username }, function (err, foundUser) {
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    const userTokenInfo = {
                        username: foundUser.username,
                        _id: foundUser._id,
                        first: foundUser.first,
                        last : foundUser.last
                    }
                    const token = jwt.sign(userTokenInfo, 'secretString', { expiresIn: "2h" });
                    res.status(200).json({ token: token })
                } else {
                    res.status(403).send("wrong password")
                } 
            } else {
                res.status(404).send("USER NOT FOUND");
            }
        });
    },
    update: (req, res) => {
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            db.Chef.findOne({ username : req.body.username })
                .then(foundUser => {
                    for (const modified in req.body) {
                        foundUser[modified] = req.body[modified];
                    }
                    foundUser.save();
                    res.status(200).send("saved changes")
                })
        }
    },
    getPhotos: (req, res) => {
        db.Chef.findById(mongoose.Types.ObjectId(req.params.id))
            .populate("photos")
            .then(foundChef => {
                res.status(200).json(foundChef.photos)
            })
            .catch(err => res.status(422).json(err));
    },
    addCuisine: (req, res) => {
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            db.Chef.findById(mongoose.Types.ObjectId(loggedInUser._id))
                .then(foundChef => {
                    foundChef.cuisine.push(mongoose.Types.ObjectId(req.params.id))
                    foundChef.save();
                    res.status(200).send("saved changes")
                })
                .catch(err => res.status(422).json(err));
        }
    },
    removeCuisine: (req, res) => {
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            db.Chef.findById(mongoose.Types.ObjectId(loggedInUser._id))
                .then(foundChef => {
                    const cuisineIndex = foundChef.cuisine.indexOf(mongoose.Types.ObjectId(req.params.id))
                    foundChef.cuisine.splice(cuisineIndex, 1);
                    foundChef.save();
                    res.status(200).send("saved changes")
                })
                .catch(err => res.status(422).json(err));
        }
    }
}
