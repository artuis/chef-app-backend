const db = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
            .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByCuisine: (req, res) => {
        db.Chef
            .find({ "cuisine._id": req.params.id })
            .populate("cuisine")
            .populate("specialty")
            .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        
        // res.send(db.Chef.exists({ username: req.body.username }));

        db.Chef.exists({ username: req.body.username }, function (err, result) {
            //res.send(result);
            if (!result) {
                db.Chef
                    .create(req.body)
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
            }
            else{
                res.status(422).send("user already exsits");
            }
        }
        )
    }
}
