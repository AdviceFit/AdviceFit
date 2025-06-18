const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/dashboard?center=all&dateFilter=today&startDate=2025-06-01&endDate=2025-06-01
router.get("/", authMiddleware.authenticate, getDashboardData);

module.exports = router;
