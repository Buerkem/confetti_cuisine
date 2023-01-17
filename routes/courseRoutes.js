const router = require("express").Router(),
courseController = require("../controllers/courseController");

router.get("/courses", courseController.CourseView)

module.exports = router;