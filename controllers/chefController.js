const db = require("../models")
//TODO : CREATE, UPDATE, DELETE
//FIND by cuisine type, specialty, service type
//FIND by location

//TODO : 

module.exports = {
    findAll: (req, res) => {
        db.Chef
            .find(req.query)
            .populate("cuisine")
            .populate("specialty")
            .sort({ name : 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByCuisine: (req, res) => {
        db.Chef
            .find({"cuisine._id" : req.params.id})
            .sort({ name : 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Chef
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}
