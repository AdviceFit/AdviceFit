const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder({
      ...req.body,
      user: req.user._id.toString(),
    });

    if (order.error) {
      return res.status(400).json({ success: false, error: order.error });
    }

    res.status(201).json({ message: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const receivedSignature =
      req.body?.signature ?? req.headers["x-razorpay-signature"];
    await orderService.verifyOrder(
      receivedSignature,
      req.body,
      req.user.credits
    );
    res
      .status(200)
      .json({ status: true, message: "Payment successfully completed" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
