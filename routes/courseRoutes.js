const router = require("express").Router(),
courseController = require("../controllers/courseController");

router.get("/", courseController.indexView)

module.exports = router;