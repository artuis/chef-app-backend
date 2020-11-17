const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
    findAll: (req, res) => {
        db.Cuisine
            .find(req.query)
            .sort({ name : 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.Cuisine
            .findById(mongoose.Types.ObjectId(req.params.id))
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

}