const router = require("express").Router();
const clientController = require("../../controllers/clientController");

router.route("/")
    .get(clientController.getUserByToken)
    .post(clientController.create)
    .put(clientController.update);

router.route("/:id")
    .get(clientController.getUserById);

router.route("/login")
    .post(clientController.login);

module.exports = router;
