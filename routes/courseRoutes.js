const router = require("express").Router(),
courseController = require("../controllers/courseController");

router.get("/", courseController.index, courseController.indexView)

module.exports = router;