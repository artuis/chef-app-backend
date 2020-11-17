const router = require("express").Router();
const specialtyController = require("../../controllers/specialtyController")

router.route("/")
    .get(specialtyController.findAll);

router.route("/:id")
    .get(specialtyController.findById);

module.exports = router;