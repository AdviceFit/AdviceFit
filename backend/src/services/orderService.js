const Transaction = require("../models/transactionModel");
const RazorPayInstance = require("../utils/payment.utils");

// Create a new session
exports.createOrder = async (payload) => {
  const order = await RazorPayInstance.orders.create({
    amount: payload.amount,
    currency: "INR",
  });
  
  const transaction = new Transaction({
    orderId: order.id,
    amount: payload.amount,
    currency: payload.currency,
    status: "pending",
  })

  await transaction.save();

  return order;
};

exports.verifyOrder = async (receivedSignature, payload) => {
  const webhookSecret = process.env.RAZORPAY_KEY_SECRET;
  const generatedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (receivedSignature === generatedSignature) {
    const { payment_id, order_id, status } = payload.payment.entity;
    const transaction = await Transaction.findOne({ orderId: order_id });
    if (transaction) {
      transaction.paymentId = payment_id;
      transaction.status = status;
      await transaction.save();

      // Initiate refund if payment failed
      if (status === "failed") {
        await razorpay.payments.refund(payment_id);
      }
    }
  } else {
    throw new Error("Invalid signature");
  }
};
