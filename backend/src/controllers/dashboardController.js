const Member = require("../models/memberModel");
const Visitor = require("../models/visitorModel");
const Expense = require("../models/expenseModel");
const Payment = require("../models/paymentModel");
const Subscription = require("../models/subscriptionModel");

exports.getDashboardData = async (req, res) => {
  try {
    const { center = "all", dateFilter = "today", startDate, endDate } = req.query;

    const now = new Date();
    let dateQuery = {};

    // Date Filter Logic
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
          const day = start.getDay();
          const diffToMonday = day === 0 ? -6 : 1 - day;
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

    const centerQuery = center !== "all" ? { centerName: center } : {};

    // Parallel Queries
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

    const response = {
      newMembers: totalMembers,
      newMembersMale: maleMembers,
      newMembersFemale: femaleMembers,
      newMembersLabel: `M: ${maleMembers}, F: ${femaleMembers}`,

      newVisitors: visitorsCount,
      newVisitorsMale: maleVisitors,
      newVisitorsFemale: femaleVisitors,
      newVisitorsLabel: `M: ${maleVisitors}, F: ${femaleVisitors}`,

      expenses: expenseAgg[0]?.total || 0,
      collected: paymentAgg[0]?.total || 0,
      renewedSubscription: subscriptionCount,

      // Static values
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
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
