const Member = require("../models/memberModel");
const Visitor = require("../models/visitorModel");
const Subscription = require("../models/subscriptionModel");
const Package = require("../models/packageModel");
const Payment = require("../models/paymentModel");

const getDateFilter = (dateFilter, startDate, endDate) => {
  const today = new Date();
  let filter = {};

  switch (dateFilter) {
    case "today":
      filter = {
        $gte: new Date(today.setHours(0, 0, 0, 0)), 
        $lte: new Date(today.setHours(23, 59, 59, 999))
      };
      break;

    case "yesterday":
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      filter = {
        $gte: new Date(yesterday.setHours(0, 0, 0, 0)),
        $lte: new Date(yesterday.setHours(23, 59, 59, 999))
      };
      break;

    case "lastWeek":
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      filter = { $gte: lastWeek };
      break;

    case "lastMonth":
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);
      filter = { $gte: lastMonth };
      break;

    case "custom":
      filter = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
      break;

    default:
      filter = {};
  }

  return filter;
};

exports.fetchDashboardData = async (center, dateFilter, startDate, endDate) => {
  try {
    const filters = {};
    if (center && center !== "all") filters.visiting_center = center;

    // Apply date filter on createdAt and updatedAt
    if (dateFilter) {
      const dateRange = getDateFilter(dateFilter, startDate, endDate);
      filters.$or = [{ createdAt: dateRange }, { updatedAt: dateRange }];
    }

    // Fetch data
    const members = await Member.find(filters);
    const visitors = await Visitor.find(filters);

    const expiredMembers = await getExpiredMembers(members);
    const collectedAmount = await getCollectedPayments(members);

    return {
      totalMembers: members.length,
      totalVisitors: visitors.length,
      expiredMembers: expiredMembers.length,
      collectedAmount,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getExpiredMembers = async (members) => {
  const expired = [];
  for (const member of members) {
    const subscriptions = await Subscription.find({ memberId: member._id });
    console.log("subscriptions", subscriptions);
    for (const sub of subscriptions) {
      const pkg = await Package.findById(sub.packageId);
      if (pkg && new Date(sub.endDate) < new Date()) { //Need to add subscritpion end date here after soham's migration 
        expired.push(member);
      }
    }
  }
  return expired;
};

const getCollectedPayments = async (members) => {
  let total = 0;
  for (const member of members) {
    const payments = await Payment.find({ memberId: member._id });
    total += payments.reduce((sum, pay) => sum + pay.paidAmount, 0);
  }
  return total;
};
