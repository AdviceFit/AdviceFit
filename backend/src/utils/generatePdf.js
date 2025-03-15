const PDFDocument = require("pdfkit");

const generatePDF = async (reportName, data) => {
  const doc = new PDFDocument({ margin: 10, size: "A4" });
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  // Add Report Header
  doc.fontSize(18).text(`Report: ${reportName}`, { align: "center" });
  doc.moveDown();

  // Table formatting
  const tableTop = 100;
  const cellPadding = 5;
  const cellWidth = (doc.page.width - 60) / Object.keys(data[0]).length;

  // Add Table Headers
  const keys = Object.keys(data[0]);
  let x = 30;

  doc.fontSize(10).font("Helvetica-Bold");

  // Dynamically calculate header height
  const headerHeights = keys.map((key) => {
    return doc.heightOfString(key, { width: cellWidth - 2 * cellPadding });
  });
  const headerRowHeight = Math.max(...headerHeights) + 2 * cellPadding;

  keys.forEach((key) => {
    doc.rect(x, tableTop, cellWidth, headerRowHeight).stroke();
    doc.text(key, x + cellPadding, tableTop + cellPadding, {
      width: cellWidth - 2 * cellPadding,
      align: "center",
    });
    x += cellWidth;
  });

  // Add Data Rows
  let y = tableTop + headerRowHeight;
  doc.font("Helvetica").fontSize(8);

  data.forEach((row) => {
    x = 30;

    // Calculate the height of the row based on the tallest cell
    const cellHeights = keys.map((key) => {
      const text = row[key].toString();
      return doc.heightOfString(text, { width: cellWidth - 2 * cellPadding });
    });

    const rowHeight = Math.max(...cellHeights) + 2 * cellPadding;

    keys.forEach((key) => {
      doc.rect(x, y, cellWidth, rowHeight).stroke();
      doc.text(row[key], x + cellPadding, y + cellPadding, {
        width: cellWidth - 2 * cellPadding,
      });
      x += cellWidth;
    });

    y += rowHeight;
  });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", (err) => reject(err));
  });
};

module.exports = { generatePDF };
