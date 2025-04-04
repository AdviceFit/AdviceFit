const Razorpay = require("razorpay");

const RazorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID || "Razorpay",
  key_secret: process.env.RAZORPAY_CLIENT_SECRET,
});

module.exports = RazorPayInstance;
