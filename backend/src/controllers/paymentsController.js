const paymentsService = require("../services/paymentsService");

exports.getAllPayments = async (req, res) => {
  try {
    const userId = req.user._id;

    const payments = await paymentsService.getAllPayments(userId);
    res.status(200).json({ payments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Payment By ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await paymentsService.findPaymentById(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Payment
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedBy = req.user._id; // Assign logged-in user

    const updatedPayment = await paymentsService.updatePayment(
      req.user._id,
      id,
      updateData
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Payment
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment = await paymentsService.deletePayment(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
