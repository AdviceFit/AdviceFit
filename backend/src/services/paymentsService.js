const Payment = require("../models/paymentModel");

// Create a new payment
exports.createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};

exports.getAllPayments = async (userId) => {
  return await Payment.find({
    createdBy: userId,
    isDeleted: false,
  })
    .populate({
      path: "memberId",
      populate: {
        path: "center",
        select: "_id name",
      },
    })
    .populate({
      path: "subscriptionId",
      populate: {
        path: "packageId",
      },
    });
};

// Get a payment by ID
exports.findPaymentById = async (id) => {
  return await Payment.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate({
      path: "memberId",
      populate: {
        path: "center",
        select: "_id name",
      },
    })
    .populate({
      path: "subscriptionId",
      populate: {
        path: "packageId",
      },
    });
};

// Update a payment by ID
exports.updatePayment = async (userId, id, updateData) => {
  const payment = await Payment.findOne({
    _id: id,
    isDeleted: false,
    createdBy: userId,
  });

  if (!payment) {
    throw new Error("No matching payment found.");
  }
  const result = await Payment.findOneAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true }
  );
  return result;
};

// Delete a payment by ID
exports.deletePayment = async (id) => {
  return await Payment.findOneAndUpdate(
    { _id: id },
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );
};
