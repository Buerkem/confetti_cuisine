const router = require("express").Router(),
userRoutes = require("../routes/userRoutes"),
courseRoutes = require("../routes/courseRoutes"),
subscribeRoutes = require("../routes/subscriberRoutes"),
homeRoutes = require("../routes/homeRoutes");

router.use("/users", userRoutes)
router.use("/subscribers", subscribeRoutes)
router.use("/courses", courseRoutes),
router.use("/", homeRoutes),
module.exports = router;