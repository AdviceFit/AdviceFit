const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new package
router.post("/", authMiddleware.authenticate, packageController.createPackage);

// Get all packages (optional: filter by centerId)
router.get("/", authMiddleware.authenticate, packageController.getPackages);

// Get package details by ID
router.get("/:id", authMiddleware.authenticate, packageController.getPackageById);

// Update a package
router.put("/:id", authMiddleware.authenticate, packageController.updatePackage);

// Delete a package (soft delete)
router.delete("/:id", authMiddleware.authenticate, packageController.deletePackage);

module.exports = router;
