const { v4 } = require("uuid");
const { numberToWords } = require("./common.utils");

const getInvoiceHTML = (invoice) => {
  const formatAddress = (address) => {
    const parts = [];
    if (address?.addressLine1) parts.push(address.addressLine1);
    if (address?.addressLine2) parts.push(address.addressLine2);
    if (address?.city) parts.push(address.city);
    if (address?.state) parts.push(address.state);
    if (address?.country) parts.push(address.country);
    if (address?.pincode) parts.push(address.pincode);

    return parts.length > 0 ? parts.join(", ") : "Address not available";
  };

  return `
    <!DOCTYPE html>
        <html>
        <head>
            <style>
				body {
					padding : 30px 40px
                }
                table, th, td, tr {
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                .header {
                    font-weight: 600;
                    text-align: center;
                    padding: 10px;
                }

                td {
                    padding: 10px;
                }

                .block {
                    display: block;
                }

                .custom-table {
                    width: 100%;
                    border-top: 1px solid transparent;
                    text-align: center;
                }

                .custom-table td {
                    text-align: center;
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: auto auto;
                    gap: 10px;
                    border: 1px solid black;
                    padding: 10px;
                }

                .grid-container > div {
                    padding: 10px;
                    text-align: start;
                }

                .highlight {
                    background-color: #E5E4E2;
                }

                .inline-padding {
                    padding: 10px;
                }
                .custom-table , .custom-table > tbody > tr > td , .custom-table > tbody > tr , .custom-table > tbody , .grid-container  {
                    border-top : 1px solid transparent;
                    text-align: center;
                }
            </style>
        </head>
        <body>
        <table style="width :100%;">
            <tr>
                <td colspan="2" class="header">Tax Invoice</td>
            </tr>
            <tr>
                <td colspan="2">
                    <span class="block">Gym Name : ${
                      invoice.memberId.center.name
                    }</span>
                    <span class="block">Contact No : ${
                      invoice.memberId.mobile
                    }</span>
                    <span class="block">Email : ${invoice.memberId.email}</span>
                    <span class="block">GST No : ${
                      invoice.memberId.gst ?? ""
                    }</span>
                    <span class="block">Address: ${formatAddress(
                      invoice.memberId.address
                    )}</span>
                </td>
            </tr>
            <tr>
                <td style="width: 50%;">
                    <span class="block">Member Name: ${
                      invoice.memberId.name
                    }</span>
                    <span class="block">Member Code: ${
                      invoice.memberId.gym_member_code
                    }</span>
                    <span class="block">Mobile No. : ${
                      invoice.memberId.mobile
                    }</span>
                    <span class="block">Email : ${invoice.memberId.email}</span>
                    <span class="block">Address: ${formatAddress(
                      invoice.memberId.address
                    )}</span>
                </td>
                <td style="width: 50%;">
                    <span class="block">Invoice No. : ${v4()}</span>
                    <span class="block">Date : ${invoice.paymentDate}</span>
                </td>
            </tr>
        </table>

        <table class="custom-table">
            <tbody>
                <tr>
                    <td style="width: 10%;">Sr No.</td>
                    <td style="width: 20%;">Package Details</td>
                    <td style="width: 10%;">Price</td>
                    <td style="width: 10%;">Offer</td>
                    <td style="width: 50%;">Paid Amount </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>${
                      invoice?.subscriptionId?.packageId.packageName ?? "-"
                    }<br>(${
    invoice.subscriptionId.packageId.noOfDays ?? "-"
  } Days)</td>
                    <td>${invoice.offerAmount}</td>
                    <td>${invoice.offerAmount}</td>
                    <td>${invoice.paidAmount}</td>
                </tr>
            </tbody>
        </table>

        <div class="grid-container highlight">
            <div>In words ${numberToWords(invoice.paidAmount)} only</div>
            <div>
                <table>
                    <tr>
                        <th class="inline-padding">Receive</th>
                        <th class="inline-padding">${
                          invoice.subscriptionId.paidAmount
                        } +  (${invoice.paymentMode})</th>
                    </tr>
                </table>
            </div>
        </div>

        <div class="grid-container">
            <div>Balance ${invoice.paidAmount}</div>
            <div>
                <span class="block">${invoice.memberId.center.name}</span>
                <span class="block">${invoice.memberId.mobile}</span>
                <span class="block">Receiver</span>
            </div>
        </div>

        </body>
    </html>
 `;
};

module.exports = { getInvoiceHTML };
