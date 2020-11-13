const router = require("express").Router();
const cuisineController = require("../../controllers/cuisineController")

router.route("/")
    .get(cuisineController.findAll);

module.exports = router;