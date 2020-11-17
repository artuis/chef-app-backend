const router = require("express").Router();
const photoController = require("../../controllers/photoController");

router.route("/")
    .get(photoController.findAll)
    .post(photoController.upload);

router.route("/:id")
    .get(photoController.findById);

    

module.exports = router;