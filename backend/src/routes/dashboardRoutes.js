const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get("/", authMiddleware.authenticate,getDashboardData);


module.exports = router;