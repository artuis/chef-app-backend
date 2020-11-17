const db = require("../models");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false
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
    upload: (req, res) => {
        req.body.chefId = mongoose.Types.ObjectId(req.body.chefId);
        db.Photo
            .create(req.body)
            .then(photo => {
                console.log(photo);
                db.Chef.findById(photo.chefId)
                    .then(chef => {
                        console.log(chef.photos);
                        chef.photos.push(photo._id);
                        chef.save();
                        res.status(200).json(photo);
                    })
                    .catch(err => res.status(422).json(err));    
            })
            .catch(err => res.status(422).json(err));
    },
    findAll: (req, res) => {
        db.Photo
            .find(req.query)
            .sort("-createdOn")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.Photo
            .findById(mongoose.Types.ObjectId(req.params.id))
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
        console.log("update");
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            db.Photo
                .findById(mongoose.Types.ObjectId(req.params.id))
                .then(photo => {
                    if (loggedInUser._id === photo.chefId.toString()) {
                        for (const modified in req.body) {
                            photo[modified] = req.body[modified];
                        }
                        photo.save();
                        res.status(200).json(photo);
                    } else {
                        res.status(422).send("error updating photo");
                    }
                })
                .catch(err => res.status(422).json(err));
        }
    },
    delete: (req, res) => {
        const loggedInUser = checkAuthStatus(req);
        if (!loggedInUser) {
            res.status(401).send("NOT LOGGED IN")
        } else {
            db.Photo
                .findById(mongoose.Types.ObjectId(req.params.id))
                .then(photo => {
                    if (loggedInUser._id === photo.chefId.toString()) {
                        db.Chef.findById(mongoose.Types.ObjectId(photo.chefId))
                            .then(foundChef => {
                                const photoIndex = foundChef.photos.indexOf(photo._id);
                                foundChef.photos.splice(photoIndex, 1);
                                foundChef.save();
                            })
                        photo.remove(err => {
                            if (err) res.status(422).json(err)
                            res.status(200).send("photo deleted");
                        })
                    } else {
                        res.status(422).send("error deleting photo");
                    }
                })
                .catch(err => res.status(422).json(err));
        }
        
    }

}