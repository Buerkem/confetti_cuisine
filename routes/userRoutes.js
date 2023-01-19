const router = require("express").Router(),
userController = require("../controllers/userController");

router.get("/", userController.index, userController.indexView)

router.get("/login", userController.loginView)
router.get("/new", userController.newView)
router.get("/edit/:userId", userController.editView)
router.get("/logout", userController.logout, userController.redirectView)
router.get("/:user_id", userController.userView)
router.post("/create", userController.create,userController.index, userController.redirectView)
router.post("/login", userController.authenticate)
router.put("/:userId/update", userController.update, userController.redirectView)
router.delete("/:userId/delete", userController.delete, userController.redirectView)

module.exports = router;