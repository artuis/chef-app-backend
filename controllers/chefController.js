const db = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//TODO : CREATE, UPDATE, DELETE
//FIND by cuisine type, specialty, service type
//FIND by location

//TODO : 

module.exports = {
    checkAuthStatus: request => {
        console.log(request.headers);
        if (!request.headers.authorization) {
            return false
        }
        const token = request.headers.authorization.split(" ")[1]
        console.log(token);
        const loggedInUser = jwt.verify(token, 'secretString', (err, data) => {
            if (err) {
                return false
            }
            else {
                return data
            }
        });
        console.log(loggedInUser)
        return loggedInUser
    },
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
                res.status(422).send("user already exists");
            }
            }
        )
    },
    login: (req, res) => {
        db.Chef.findOne({ username: req.body.username }, function (err, foundUser) {
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    const userTokenInfo = {
                        username: foundUser.username,
                        _id: foundUser._id,
                        name: foundUser.first + " " + foundUser.last
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
    }
}
