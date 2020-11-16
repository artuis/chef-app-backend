const router = require("express").Router();
const chefRoutes = require("./chefRoutes")
const cuisineRoutes = require("./cuisineRoutes");
const serviceTypeRoutes = require("./serviceTypeRoutes");
const specialtyRoutes = require("./specialtyRoutes");

router.use("/chef", chefRoutes);
router.use("/cuisine", cuisineRoutes);
router.use("/servicetype", serviceTypeRoutes);
router.use("/specialty", specialtyRoutes);

module.exports = router;
