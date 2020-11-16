const router = require("express").Router();
const chefController = require("../../controllers/chefController")

router.route("/")
    .get(chefController.findAll)
    .post(chefController.create);

router.route("/cuisine/:id")
    .get(chefController.findByCuisine);

router.route("/login")
    .post(chefController.login);

module.exports = router;