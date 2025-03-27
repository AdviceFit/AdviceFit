const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true , unique: true },
  paymentId: { type: String },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  amount: { type: Number, required: true },
  user : { type: String, ref: "User", required: true },
  currency: { type: String, default: "INR" },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
