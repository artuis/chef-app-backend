const router = require("express").Router();
const photoController = require("../../controllers/photoController");

router.route("/")
    .get(photoController.findAll)
    .post(photoController.upload);

router.route("/:id")
    .get(photoController.findById)
    .delete(photoController.delete)
    .put(photoController.update);

module.exports = router;