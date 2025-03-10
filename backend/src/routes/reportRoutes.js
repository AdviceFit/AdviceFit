const express = require("express");
const ReportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/get-report",
  authMiddleware.authenticate,
  ReportController.getReport
);

module.exports = router;
