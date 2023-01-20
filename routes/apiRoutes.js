const router = require("express").Router(),
courseController = require("../controllers/courseController");

router.get("/courses", courseController.index, courseController.respondJSON )
router.use("/api/courses/:courseId/join", courseController.join)
router.use("/courses", courseController.errorJSON)

module.exports = router;
