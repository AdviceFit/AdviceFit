const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// Logout Route
router.get("/logout", userController.logout);

// Signup Route
router.post("/signup", userController.signup);

// Login Route
router.post("/login", userController.login);

// Me Route
router.get("/me", authMiddleware.authenticate, userController.getMe);

// Validate Member link
router.get("/validate-member-pass/:id", userController.validateMemberLink);

// Set Member Password
router.patch("/set-member-password/:id", userController.setMemberPassword);

// Get All Roles
router.get("/roles", authMiddleware.authenticate, userController.getAllRoles);

// Get All Rights
router.get("/rights", authMiddleware.authenticate, userController.getAllRights);

router.get("/history", authMiddleware.authenticate, userController.getLoginHistory);

module.exports = router;
