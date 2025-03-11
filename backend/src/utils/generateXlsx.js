const XLSX = require("xlsx");
const generateExcel = async (reportName, data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, reportName);

  // Write workbook to a buffer
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return buffer;
};


module.exports = { generateExcel };