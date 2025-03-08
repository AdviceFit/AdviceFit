const Subscription = require("../models/subscriptionModel");

// Create a new subscription
exports.createSubscription = async (subscriptionData) => {
  const subscription = new Subscription(subscriptionData);
  return await subscription.save();
};

exports.getAllSubscriptions = async (userId) => {
  return await Subscription.find({
    createdBy: userId,
    isDeleted: false,
  }).populate({
    path: "memberId",
    populate: {
      path: "center",
      select: "_id name",
    },
  });
};

// Get a subscription by ID
exports.findSubscriptionById = async (id) => {
  return await Subscription.findOne({
    _id: id,
    isDeleted: false,
  }).populate({
    path: "memberId",
    populate: {
      path: "center",
      select: "_id name",
    },
  });
};

// Update a subscription by ID
exports.updateSubscription = async (userId, id, updateData) => {
  const subscription = await Subscription.findOne({
    _id: id,
    isDeleted: false,
    createdBy: userId,
  });

  if (!subscription) {
    throw new Error("No matching subscription found.");
  }
  const result = await Subscription.findOneAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true }
  );
  return result;
};

// Delete a subscription by ID
exports.deleteSubscription = async (id) => {
  return await Subscription.findOneAndUpdate(
    { _id: id },
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );
};
