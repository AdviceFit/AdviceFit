const Member = require("../models/memberModel");

exports.getAllSubscriptions = async (userId) => {
  return await Member.find({
    createdBy: userId,
    isDeleted: false,
    subscriptionDetails: { $exists: true, $ne: null },
  }).populate("center", "_id name");
};

// Get a subscription by ID
exports.findSubscriptionById = async (id) => {
  return await Member.findOne({
    "subscriptionDetails._id": id,
  }).select("subscriptionDetails");
};

// Update a subscription by ID
exports.updateSubscription = async (id, updateData) => {
  return await Member.findOneAndUpdate(
    { "subscriptionDetails._id": id },
    {
      $set: { "subscriptionDetails.$": updateData },
    },
    { new: true } // Return the updated document
  ).populate("center", "_id name");
};

// Delete a subscription by ID
exports.deleteSubscription = async (id) => {
  return await Member.findOneAndUpdate(
    { "subscriptionDetails._id": id },
    {
      $set: { "subscriptionDetails.$.isDeleted": true },
    },
    { new: true }
  );
};
