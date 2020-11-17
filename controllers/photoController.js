const db = require("../models");
const mongoose = require("mongoose");

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

}