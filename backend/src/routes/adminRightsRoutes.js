const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminRightsController = require("../controllers/adminRightsController");

// Get Admin Rights data
router.get(
  "/",
  authMiddleware.authenticate,
  adminRightsController.getAdminRightsData
);

// Update Admin Rights data
router.post(
  "/",
  authMiddleware.authenticate,
  adminRightsController.updateAdminRightsData
);

module.exports = router;
