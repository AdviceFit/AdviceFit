const Member = require("../models/memberModel");

exports.getAllSubscriptions = async (userId) => {
  return await Member.find({
    createdBy: userId,
    isDeleted: false,
    "subscriptionDetails.isDeleted": { $ne: true },
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
exports.updateSubscription = async (userId, id, updateData) => {
  const member = await Member.findOne({ "subscriptionDetails._id": id });

  if (!member) {
    throw new Error("No matching subscription found.");
  }
  const result = await Member.findOneAndUpdate(
    { "subscriptionDetails._id": id },
    {
      $set: { subscriptionDetails: updateData },
    },
    { new: true }
  );
  return result;
};

// Delete a subscription by ID
exports.deleteSubscription = async (id) => {
  return await Member.findOneAndUpdate(
    { "subscriptionDetails._id": id },
    {
      $set: { "subscriptionDetails.isDeleted": true },
    },
    { new: true }
  );
};
