const router = require("express").Router();
const specialtyController = require("../../controllers/specialtyController")

router.route("/")
    .get(specialtyController.findAll);

module.exports = router;