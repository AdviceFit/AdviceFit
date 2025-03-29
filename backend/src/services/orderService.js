const Transaction = require("../models/transactionModel");
const RazorPayInstance = require("../utils/payment.utils");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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
    return { error: error.error.description };
  }
};

exports.verifyOrder = async (_receivedSignature, payload, credits) => {
  if (payload.status === "success") {
    const { payment_id, order_id, status, mediaType } = payload;

    const transaction = await Transaction.findOne({ orderId: order_id });
    if (transaction) {
      transaction.paymentId = payment_id;
      transaction.status = status;
      await transaction.save();

      const userId = transaction.user;
      const mediaTypeKey = mediaType.toLowerCase();
      const creditIncrement = Math.round(transaction.amount / 2);
      const session = await mongoose.startSession();
      
      try {
        session.startTransaction();
        const user = await User.findOne({ _id: userId }).session(session);
        if (!user) {
          throw new Error("User not found");
        }

        const updatedCredit = (credits[mediaTypeKey] || 0) + creditIncrement;
        const updateResult = await User.updateOne(
          { _id: userId, [`credits.${mediaTypeKey}`]: credits[mediaTypeKey] },
          { $set: { [`credits.${mediaTypeKey}`]: updatedCredit } },
          { session }
        );

        if (updateResult.modifiedCount === 0) {
          throw new Error(
            "Failed to update user credits. Credits might have changed."
          );
        }

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }

      // Initiate refund if payment failed
      // Uncomment the following block if refund logic is needed
      if (status === "failed") {
        await this.failedOrder(transaction);
      }
    } else {
      throw new Error("Transaction not found");
    }
  } else {
    throw new Error("Invalid signature");
  }
};

// Refund Logic
exports.failedOrder = async (transaction) => {
  try {
    const refund = await RazorPayInstance.payments.refund(payment_id, {
      speed: "optimum",
    });

    transaction.refundId = refund.id;
    transaction.refundStatus = refund.status;
    await transaction.save();

    return refund;
  } catch (refundError) {
    console.error("Refund failed:", refundError.message);
    throw new Error("Refund initiation failed");
  }
};
