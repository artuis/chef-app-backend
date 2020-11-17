const router = require("express").Router();
const photoController = require("../../controllers/photoController");

router.route("/")
    .get(photoController.findAll);

router.route("/:id")
    .get(photoController.findById);

router.route("/")
    .post(photoController.upload);

module.exports = router;