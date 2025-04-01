const DashboardService = require("../services/dashboardService");

exports.getDashboardData = async (req, res) => {
  try {
    const { center, dateFilter, startDate, endDate } = req.query;
    console.log("Dashboard Data Request", req.query);
    const data = await DashboardService.fetchDashboardData(center, dateFilter, startDate, endDate);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};