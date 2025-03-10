const express = require("express");
const paymentsController = require("../controllers/paymentsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware.authenticate, paymentsController.getAllPayments); // Get All payments

router.get(
  "/:id",
  authMiddleware.authenticate,
  paymentsController.getPaymentById
);
router.put(
  "/:id",
  authMiddleware.authenticate,
  paymentsController.updatePayment
);
router.delete(
  "/:id",
  authMiddleware.authenticate,
  paymentsController.deletePayment
);

module.exports = router;
