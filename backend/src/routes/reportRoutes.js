const express = require("express");
const ReportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/get-report",
  authMiddleware.authenticate,
  ReportController.getReport
);

router.get("/get-invoice", 
  authMiddleware.authenticate,
  ReportController.getInvoice
)

module.exports = router;
