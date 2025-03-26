const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const receivedSignature = req.body?.signature ?? req.headers["x-razorpay-signature"];
    await orderService.verifyOrder(receivedSignature , req.body);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
