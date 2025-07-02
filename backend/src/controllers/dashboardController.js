const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Member = require("../models/memberModel");
const Visitor = require("../models/visitorModel");
const Expense = require("../models/expenseModel");
const Payment = require("../models/paymentModel");
const Subscription = require("../models/subscriptionModel");

exports.getDashboardData = async (req, res) => {
  try {
    const { centerId = "all", dateFilter = "today", startDate, endDate } = req.query;
    const now = new Date();
    let dateQuery = {};

    // 🗓 Date filter logic
    if (startDate && endDate) {
      dateQuery = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else {
      let start, end;
      switch (dateFilter.toLowerCase()) {
        case "today":
          start = new Date();
          start.setHours(0, 0, 0, 0);
          end = new Date();
          end.setHours(23, 59, 59, 999);
          break;
        case "yesterday":
          start = new Date();
          start.setDate(start.getDate() - 1);
          start.setHours(0, 0, 0, 0);
          end = new Date(start);
          end.setHours(23, 59, 59, 999);
          break;
        case "thisweek":
          start = new Date();
          const diffToMonday = start.getDay() === 0 ? -6 : 1 - start.getDay();
          start.setDate(start.getDate() + diffToMonday);
          start.setHours(0, 0, 0, 0);
          end = new Date();
          end.setHours(23, 59, 59, 999);
          break;
        case "lastweek":
          start = new Date();
          const lastDay = start.getDay();
          const diffToLastMonday = lastDay === 0 ? -13 : -6 - lastDay;
          start.setDate(start.getDate() + diffToLastMonday);
          start.setHours(0, 0, 0, 0);
          end = new Date(start);
          end.setDate(end.getDate() + 6);
          end.setHours(23, 59, 59, 999);
          break;
        case "thismonth":
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
          break;
        case "lastmonth":
          start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
          break;
        default:
          start = null;
          end = null;
      }

      if (start && end) {
        dateQuery = {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        };
      }
    }

    
    const centerQuery =
  centerId !== "all"
    ? {
        $or: [
          { center: new ObjectId(centerId) },
          { visiting_center: new ObjectId(centerId) },
        ]
    }
    : {};

    const [
      totalMembers,
      maleMembers,
      femaleMembers,
      visitorsCount,
      maleVisitors,
      femaleVisitors,
      expenseAgg,
      paymentAgg,
      subscriptionCount,
    ] = await Promise.all([
      Member.countDocuments({ ...centerQuery, ...dateQuery }),
      Member.countDocuments({ ...centerQuery, ...dateQuery, gender: "Male" }),
      Member.countDocuments({ ...centerQuery, ...dateQuery, gender: "Female" }),
      Visitor.countDocuments({ ...centerQuery, ...dateQuery }),
      Visitor.countDocuments({ ...centerQuery, ...dateQuery, gender: "Male" }),
      Visitor.countDocuments({ ...centerQuery, ...dateQuery, gender: "Female" }),
      Expense.aggregate([
        { $match: { ...centerQuery, ...dateQuery } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Payment.aggregate([
        { $match: { ...centerQuery, ...dateQuery } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Subscription.countDocuments({ ...centerQuery, ...dateQuery }),
    ]);

  
    const from = startDate ? new Date(startDate) : now;
    const to = endDate ? new Date(endDate) : now;
    const diffInDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    let groupBy;
    if (diffInDays <= 1) groupBy = { $hour: "$createdAt" };
    else if (diffInDays <= 7) groupBy = { $dayOfWeek: "$createdAt" };
    else groupBy = { $dayOfMonth: "$createdAt" };

    const collectionAgg = await Payment.aggregate([
      { $match: { ...centerQuery, ...dateQuery } },
      { $group: { _id: groupBy, total: { $sum: "$amount" } } },
      { $project: { name: "$_id", Collection: "$total", _id: 0 } },
    ]);

    const expenseAggChart = await Expense.aggregate([
      { $match: { ...centerQuery, ...dateQuery } },
      { $group: { _id: groupBy, total: { $sum: "$amount" } } },
      { $project: { name: "$_id", Expenses: "$total", _id: 0 } },
    ]);

  
    const chartMap = new Map();
    collectionAgg.forEach((item) => {
      chartMap.set(item.name, {
        name: `Slot ${item.name}`,
        Collection: item.Collection,
        Expenses: 0,
      });
    });

    expenseAggChart.forEach((item) => {
      if (chartMap.has(item.name)) {
        chartMap.get(item.name).Expenses = item.Expenses;
      } else {
        chartMap.set(item.name, {
          name: `Slot ${item.name}`,
          Collection: 0,
          Expenses: item.Expenses,
        });
      }
    });

    const mergedChartData = Array.from(chartMap.values());

    const chartData = {
      Daily: {
        "Collection vs Expenses": mergedChartData,
      },
    };

    
    const response = {
      newMembers: totalMembers,
      newMembersMale: maleMembers,
      newMembersFemale: femaleMembers,
      newVisitors: visitorsCount,
      newVisitorsMale: maleVisitors,
      newVisitorsFemale: femaleVisitors,
      expenses: expenseAgg[0]?.total || 0,
      collected: paymentAgg[0]?.total || 0,
      renewedSubscription: subscriptionCount,
      balanceDue: 0,
      balanceDueLabel: "₹0 due",
      expiredMembership: 0,
      renewalFollowUp: 0,
      renewalFollowUpLabel: "0 follow-ups",
      visitorFollowUp: 0,
      visitorFollowUpLabel: "0 follow-ups",
      balanceFollowUp: 0,
      nonLiveFollowUp: 0,
      greeting: 0,
      sale: 0,
      chartData,
    };
    

    
    return res.status(200).json(response);
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
