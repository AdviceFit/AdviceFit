const Transaction = require("../models/transactionModel");
const RazorPayInstance = require("../utils/payment.utils");
const { updatedUser } = require("./userService");
const crypto = require("crypto");

// Create a new session
exports.createOrder = async (payload) => {
  try {
    const order = await RazorPayInstance.orders.create({
      amount: payload.amount,
      currency: "INR",
    });

    const transaction = new Transaction({
      orderId: order.id,
      amount: payload.amount,
      currency: payload.currency,
      user: payload.user,
      status: "pending",
    });

    await transaction.save();
    return order;
  } catch (error) {
    return { error : error.error.description }
  }
};

exports.verifyOrder = async (_receivedSignature, payload, credits) => {

  // Commented for the webhook which will be done after hosting 

  // const webhookSecret = process.env.RAZORPAY_KEY_SECRET;
  // const generatedSignature = crypto
  //   .createHmac("sha256", webhookSecret)
  //   .update(JSON.stringify(req.body))
  //   .digest("hex");

  
  if (payload.status == 'success') {
    const { payment_id, order_id, status, mediaType } = payload;
    
    const transaction = await Transaction.findOne({ orderId: order_id });
    if (transaction) {
      transaction.paymentId = payment_id;
      transaction.status = status;
      await transaction.save();

      console.log(credits);
      
      await updatedUser({
        _id: transaction.user,
        credits: {
          ...credits,
          [mediaType.toLowerCase()]: credits[mediaType.toLowerCase()] + transaction.amount,
        },
      });

      // Initiate refund if payment failed

      // if (status === "failed") {
      //   await razorpay.payments.refund(payment_id);
      // }
    }
  } else {
    throw new Error("Invalid signature");
  }
};
