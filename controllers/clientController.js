const db = require("../models");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false;
    }
    const token = request.headers.authorization.split(" ")[1]
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET || 'secretString', (err, data) => {
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
    create: function (req, res) {
        req.body.username_lower = req.body.username.toLowerCase();
        db.Client.exists({
            $or: [
                { username: req.body.username },
                { username_lower: req.body.username_lower }
            ]
        }, function (err, result) {
            if (!result) {
                db.Client
                    .create(req.body)
                    .then(createdUser => {
                        db.Address.create(req.body)
                        .then(address => {
                            const userTokenInfo = {
                                username: createdUser.username,
                                _id: createdUser._id,
                                first: createdUser.first,
                                last: createdUser.last
                            }
                            const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET || 'secretString', { expiresIn: "2h" });
                            createdUser.addressId = address._id;
                            address.clientId = createdUser._id;
                            createdUser.save();
                            address.save();
                            res.status(200).json({ token: token, ...userTokenInfo })
                        })
                    })
                    .catch(err => res.status(422).json(err));
            } else {
                res.status(422).send("user already exists");
            }
        });
    },
    getUserById: (req, res) => {
        db.Client.findById(mongoose.Types.ObjectId(req.params.id))
            .populate("addressId")
            .select("-password")
            .then(foundUser => {
                res.status(200).json(foundUser)
            })
            .catch(err => res.status(422).json(err));
    },
    getUserByToken: (req, res) => {
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            
            db.Client.findById(mongoose.Types.ObjectId(loggedInUser._id))
                .populate("addressId")
                .select("-password")
                .then(foundUser => {
                    res.status(200).json(foundUser)
                })
                .catch(err => res.status(422).json(err));
        }
    },
    login: (req, res) => {
        db.Client.findOne({ username: req.body.username }, function (err, foundUser) {
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    const userTokenInfo = {
                        username: foundUser.username,
                        _id: foundUser._id,
                        first: foundUser.first,
                        last: foundUser.last
                    }
                    const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET || 'secretString', { expiresIn: "2h" });
                    res.status(200).json({ token: token, ...userTokenInfo })
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
            db.Client.findById(mongoose.Types.ObjectId(loggedInUser._id))
                .select("-password")
                .then(foundUser => {
                    for (const modified in req.body) {
                        foundUser[modified] = req.body[modified];
                    }
                    foundUser.save();
                    db.Address.findById(foundUser.addressId)
                        .then(foundAddress => {
                            for (const modified in req.body) {
                                foundAddress[modified] = req.body[modified];
                            }
                            foundAddress.save((err, addr) => {
                                db.Client.findById(addr.clientId)
                                    .select("-password")
                                    .populate("addressId")
                                    .then(foundUser => {
                                        res.status(200).json(foundUser)
                                    })
                            })
                        }).catch(err => res.status(422).json(err));
                }).catch(err => res.status(422).json(err));
        }
    }
}