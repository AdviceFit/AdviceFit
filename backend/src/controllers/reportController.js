const ReportService = require("../services/reportService");

// Get all reports
exports.getReport = async (req, res) => {
  try {
    await ReportService.generateReport(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
