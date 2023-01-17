const router = require("express").Router(),
userRoutes = require("../routes/userRoutes"),
courseRoutes = require("../routes/courseRoutes"),
subscribeRoutes = require("../routes/subscriberRoutes");

router.use("/users", userRoutes)
router.use("/subscriber", subscribeRoutes)
router.use("/course", courseRoutes),
module.exports = router;