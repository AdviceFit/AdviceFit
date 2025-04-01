const express = require("express");
const subscriptionsController = require("../controllers/subscriptionsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/group-subscriptions",
  authMiddleware.authenticate,
  subscriptionsController.getGroupedSubscriptions
);

router.get(
  "/",
  authMiddleware.authenticate,
  subscriptionsController.getAllSubscriptions
); // Get All subscriptions
router.get(
  "/:id",
  authMiddleware.authenticate,
  subscriptionsController.getSubscriptionById
);
router.put(
  "/:id",
  authMiddleware.authenticate,
  subscriptionsController.updateSubscription
);
router.delete(
  "/:id",
  authMiddleware.authenticate,
  subscriptionsController.deleteSubscription
);

module.exports = router;
