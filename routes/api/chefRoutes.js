const router = require("express").Router();
const chefController = require("../../controllers/chefController")

router.route("/")
    .get(chefController.findAll)
    .post(chefController.create);

router.route("/addcuisine/:id")
    .put(chefController.addCuisine);

router.route("/removecuisine/:id")
    .put(chefController.removeCuisine);

router.route("/username/:username")
    .get(chefController.findByUsername);

router.route("/profile")
    .get(chefController.getCurrentProf)

router.route("/cuisine/:id")
    .get(chefController.findByCuisine);

router.route("/login")
    .post(chefController.login);

router.route("/update")
    .put(chefController.update);

router.route("/:id/photos")
    .get(chefController.getPhotos);

router.route("/:id")
    .get(chefController.findById);

module.exports = router;