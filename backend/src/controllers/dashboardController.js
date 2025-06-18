const Member = require("../models/memberModel");
const Visitor = require("../models/visitorModel");
const Expense = require("../models/expenseModel");
const Payment = require("../models/paymentModel");
const Subscription = require("../models/subscriptionModel");

exports.getDashboardData = async (req, res) => {
  try {
    const { center = "all", dateFilter = "today", startDate, endDate } = req.query;

    let dateQuery = {};

    if (startDate && endDate) {
      dateQuery = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else if (dateFilter.toLowerCase() === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateQuery = {
        createdAt: { $gte: today, $lt: tomorrow },
      };
    }

    const centerQuery = center !== "all" ? { centerName: center } : {};

    const [membersCount, visitorsCount, expenseAgg, paymentAgg, subscriptionCount] =
      await Promise.all([
        Member.countDocuments({ ...centerQuery, ...dateQuery }),
        Visitor.countDocuments({ ...centerQuery, ...dateQuery }),
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
      newMembers: membersCount,
      newMembersLabel: `${membersCount} new members`,
      newVisitors: visitorsCount,
      newVisitorsLabel: `${visitorsCount} visitors`,
      expenses: expenseAgg[0]?.total || 0,
      collected: paymentAgg[0]?.total || 0,
      renewedSubscription: subscriptionCount,
      // add placeholder values for other frontend cards
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
