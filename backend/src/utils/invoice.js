const getInvoiceHTML = () => {
  return `
    <!DOCTYPE html>
        <html>
        <head>
            <style>

				body {
					padding : 0px 40px
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
                    <span class="block">Name</span>
                    <span class="block">Name</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="block">Name</span>
                    <span class="block">Name</span>
                    <span class="block">Name</span>
                    <span class="block">Name</span>
                    <span class="block">Name</span>
                    <span class="block">Name</span>
                </td>
                <td>
                    <span class="block">Name</span>
                    <span class="block">Name</span>
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
                    <td style="width: 50%;">Amount</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>57</td>
                    <td>43</td>
                    <td>43</td>
                </tr>
            </tbody>
        </table>

        <div class="grid-container highlight">
            <div>In words five thousand only</div>
            <div>
                <table>
                    <tr>
                        <th class="inline-padding">Receive</th>
                        <th class="inline-padding">5000 (UPI)</th>
                    </tr>
                </table>
            </div>
        </div>

        <div class="grid-container">
            <div>Balance 0</div>
            <div>
                <span class="block">New Gym</span>
                <span class="block">8885956599</span>
                <span class="block">Receiver</span>
            </div>
        </div>

        </body>
    </html>
 `;
};

module.exports = { getInvoiceHTML };
