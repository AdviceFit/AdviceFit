const Member = require("../models/memberModel");
const Visitor = require("../models/visitorModel");
const Expense = require("../models/expenseModel");
const Payment = require("../models/paymentModel");
const { getDateRangeFromFilter } = require("../utils/dateUtils");

exports.fetchDashboardData = async (center, dateFilter, startDate, endDate) => {
  const { start, end } = getDateRangeFromFilter(dateFilter, startDate, endDate);

  const query = {
    createdAt: { $gte: start, $lte: end },
    ...(center !== "all" && { centerName: center }),
  };

  const [totalMembers, totalVisitors, expenses, payments] = await Promise.all([
    Member.countDocuments(query),
    Visitor.countDocuments(query),
    Expense.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Payment.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  return {
    totalMembers,
    totalVisitors,
    totalExpenses: expenses[0]?.total || 0,
    totalIncome: payments[0]?.total || 0,
  };
};
