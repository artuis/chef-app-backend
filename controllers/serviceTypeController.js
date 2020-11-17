const db = require("../models")

module.exports = {
    findAll: (req, res) => {
        db.ServiceType
            .find(req.query)
            .sort({ name : 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.ServiceType
            .findById(mongoose.Types.ObjectId(req.params.id))
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    
}