const router = require("express").Router();
const serviceTypeController = require("../../controllers/serviceTypeController")

router.route("/")
    .get(serviceTypeController.findAll);

module.exports = router;