const router = require("express").Router();
const cuisineController = require("../../controllers/cuisineController")

router.route("/")
    .get(cuisineController.findAll);

router.route("/:id")
    .get(cuisineController.findById);
    
module.exports = router;