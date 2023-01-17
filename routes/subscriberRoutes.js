const router = require("express").Router(),
subscriberController = require("../controllers/subscriberController");

router.get("/", subscriberController.getAllSubscribers, subscriberController.indexView)
router.get("/subscribers/edit/:subscriberId", subscriberController.editView)
router.get("/subscribers/:subscriberId", subscriberController.subscriberView)
router.get("/contact", subscriberController.getSubscriptionPage)
router.get("/subscribers", subscriberController.getAllSubscribers, subscriberController.indexView)
router.post("/subscribe", subscriberController.saveSubscriber)
router.put("/subscribers/:subscriberId/update", subscriberController.update, subscriberController.redirectView)

module.exports = router;