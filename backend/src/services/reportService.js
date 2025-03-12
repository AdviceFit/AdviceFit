const { getInvoiceHTML } = require("../utils/invoice");
const { generatePDF } = require("./../utils/generatePdf");
const { generateExcel } = require("./../utils/generateXlsx");
const { findPaymentById } = require("./paymentsService");
const puppeteer = require("puppeteer");

const generateReport = async (req, res) => {
  const { reportName, format } = req.body;  

  if (!reportName || !format) {
    return res
      .status(400)
      .json({ error: "Report name and format are required" });
  }

  try {
    // Fetch JSON data (replace with actual data source)
    const reportData = await getReportData(reportName);

    if (!reportData) {
      return res
        .status(404)
        .json({ error: "No data found for the requested report" });
    }

    let fileBuffer;
    let contentType = "";

    if (format === "pdf") {
      fileBuffer = await generatePDF(reportName, reportData);
      contentType = "application/pdf";
    } else if (format === "excel") {
      fileBuffer = await generateExcel(reportName, reportData);
      contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else {
      return res.status(400).json({
        error: "Invalid format. Supported formats are PDF and Excel.",
      });
    }

    // Send file buffer as a response
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${reportName}.${format === "pdf" ? "pdf" : "xlsx"}`
    );
    res.send(fileBuffer);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReportData = async (reportName) => {
  switch (reportName) {
    case "membership_report":
      return [
        {
          "Id": 1,
          "Name": "John Doe",
          "Member Ship": "Gold",
          "Address" : "Noida" ,
          "City" : "Noida" ,
          "State" : "Uttar Pradesh" ,
          "Pincode" : "201301" ,
          "Country" : "India" ,
          "Start Date": "2023-01-01",
          "End Date" : "2022-02-23"
        },
        {
          "Id": 2,
          "Name": "Jane Doe",
          "Member Ship": "Silver",
          "Address" : "Hansapore" ,
          "City" : "Navsari" ,
          "State" : "Gujarat" ,
          "Pincode" : "396450" ,
          "Country" : "India" ,
          "Start Date": "2023-01-01",
          "End Date" : "2022-02-23"
        },
      ];
    case "member_report":
      return [
        { id: 1, name: "John Doe", age: 35, city: "Los Angeles" },
        { id: 2, name: "Jane Smith", age: 30, city: "New York" },
      ];
    case "expired_membership_report":
      return [
        {
          id: 1,
          name: "John Doe",
          membership: "Gold",
          expiryDate: "2023-01-01",
        },
        {
          id: 2,
          name: "Jane Smith",
          membership: "Silver",
          expiryDate: "2023-02-15",
        },
      ];
    case "payment_due_report":
      return [
        { id: 1, name: "John Doe", amountDue: 150, dueDate: "2023-03-01" },
        { id: 2, name: "Jane Smith", amountDue: 200, dueDate: "2023-03-15" },
      ];
    case "birthday_report":
      return [
        { id: 1, name: "John Doe", birthday: "1988-05-15" },
        { id: 2, name: "Jane Smith", birthday: "1990-07-22" },
      ];
    case "anniversary_report":
      return [
        { id: 1, name: "John and Mary Doe", anniversary: "2005-06-15" },
        { id: 2, name: "Jane and Mark Smith", anniversary: "2010-08-10" },
      ];
    case "expense_report":
      return [
        { id: 1, category: "Utilities", amount: 500, date: "2023-01-15" },
        { id: 2, category: "Supplies", amount: 300, date: "2023-01-20" },
      ];
    case "collection_report":
      return [
        { id: 1, name: "John Doe", amountCollected: 150, date: "2023-02-01" },
        {
          id: 2,
          name: "Jane Smith",
          amountCollected: 200,
          date: "2023-02-05",
        },
      ];
    case "visitor_report":
      return [
        { id: 1, visitorName: "Michael Brown", visitDate: "2023-03-01" },
        { id: 2, visitorName: "Emily Davis", visitDate: "2023-03-02" },
      ];
    case "renewal_report":
      return [
        {
          id: 1,
          name: "John Doe",
          renewalDate: "2023-01-01",
          membership: "Gold",
        },
        {
          id: 2,
          name: "Jane Smith",
          renewalDate: "2023-02-15",
          membership: "Silver",
        },
      ];
    case "employee_attendance_report":
      return [
        {
          id: 1,
          employeeName: "Alice Johnson",
          attendanceDate: "2023-03-01",
          status: "Present",
        },
        {
          id: 2,
          employeeName: "Bob Wilson",
          attendanceDate: "2023-03-01",
          status: "Absent",
        },
      ];
    case "invoice_report":
      const invoices = await findPaymentById('67cf171d766e6bbf6c8221d2');
      console.log(invoices);
      return [
        { id: 1, invoiceNumber: "INV001", amount: 500, date: "2023-01-15" },
        { id: 2, invoiceNumber: "INV002", amount: 300, date: "2023-01-20" },
      ];
    case "package_report":
      return [
        { id: 1, packageName: "Fitness Pro", price: 50, duration: "1 Month" },
        { id: 2, packageName: "Yoga Bliss", price: 40, duration: "1 Month" },
      ];
    case "receipt_report":
      return [
        { id: 1, receiptNumber: "REC001", amount: 500, date: "2023-01-15" },
        { id: 2, receiptNumber: "REC002", amount: 300, date: "2023-01-20" },
      ];
    default:
      return null;
  }
};

const getInvoice = async (_req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const sampleHtml = getInvoiceHTML()
    // Set the HTML content
    await page.setContent(sampleHtml, { waitUntil: "domcontentloaded" });

    // Generate the PDF as a Buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Set response headers explicitly for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="sample.pdf"'); // Change 'inline' to 'attachment' for download
    res.setHeader("Content-Length", pdfBuffer.length);

    // Send the PDF buffer as the response
    res.end(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
}

module.exports = { generateReport , getInvoice };
