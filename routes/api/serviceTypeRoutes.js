const router = require("express").Router();
const serviceTypeController = require("../../controllers/serviceTypeController")

router.route("/")
    .get(serviceTypeController.findAll);

router.route("/:id")
    .get(serviceTypeController.findById);

module.exports = router;