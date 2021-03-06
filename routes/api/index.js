const router = require("express").Router();
const chefRoutes = require("./chefRoutes");
const clientRoutes = require("./clientRoutes");
const cuisineRoutes = require("./cuisineRoutes");
const serviceTypeRoutes = require("./serviceTypeRoutes");
const specialtyRoutes = require("./specialtyRoutes");
const photoRoutes = require("./photoRoutes")

router.use("/chef", chefRoutes);
router.use("/client", clientRoutes)
router.use("/cuisine", cuisineRoutes);
router.use("/servicetype", serviceTypeRoutes);
router.use("/specialty", specialtyRoutes);
router.use("/photo", photoRoutes);

module.exports = router;
