const ReportService = require("../services/reportService");

// Get all reports
exports.getReport = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    // const report = await ReportService.getReports();
    res.status(200).json({ message : "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
