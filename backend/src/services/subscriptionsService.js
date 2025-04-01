const Subscription = require("../models/subscriptionModel");
const { getPackageById } = require("./packageService");

// Create a new subscription
exports.createSubscription = async (subscriptionData) => {
  const addDaysToDate = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const package = await getPackageById(subscriptionData.package);

  const formattedSubscriptionData = {
    memberId: subscriptionData.memberId,
    packageId: package._id,
    subscriptionAmount: subscriptionData.offerAmount,
    subscriptionDate: subscriptionData.paymentDate,
    expiryDate: addDaysToDate(subscriptionData.startDate, package.noOfDays),
    createdBy: subscriptionData.createdBy,
    updatedBy: subscriptionData.updatedBy,
  };

  const subscription = await Subscription.create(formattedSubscriptionData);
  return subscription;
};

exports.getAllSubscriptions = async (userId) => {
  return await Subscription.find({
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
      path: "packageId",
    });
};

exports.getGroupedSubscriptions = async (userId) => {
  return await Subscription.aggregate([
    {
      $match: {
        createdBy: userId,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "packages",
        localField: "packageId",
        foreignField: "_id",
        as: "packageDetails",
      },
    },
    {
      $unwind: "$packageDetails",
    },
    {
      $lookup: {
        from: "members",
        localField: "memberId",
        foreignField: "_id",
        as: "memberDetails",
      },
    },
    {
      $unwind: "$memberDetails",
    },
    {
      $group: {
        _id: "$memberId",
        memberDetails: { $first: "$memberDetails" },
        payments: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $group: {
        _id: "$payments.packageId",
        packageDetails: {
          $first: { $arrayElemAt: ["$payments.packageDetails", 0] },
        },
        members: {
          $push: {
            memberId: "$_id",
            memberDetails: "$memberDetails",
            subscriptions: "$payments",
          },
        },
      },
    },
  ]);
};

// Get a subscription by ID Or with member id we flag true
exports.findSubscriptionById = async (id, searchByMemberId = false) => {
  return await Subscription.findOne({
    [searchByMemberId ? "memberId" : "_id"]: id,
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
      path: "packageId",
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
