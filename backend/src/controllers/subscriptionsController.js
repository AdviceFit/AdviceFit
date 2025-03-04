const subscriptionsService = require("../services/subscriptionsService");

exports.getAllSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;

    const subscriptions = await subscriptionsService.getAllSubscriptions(
      userId
    );
    res.status(200).json({ subscriptions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Subscription By ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await subscriptionsService.findSubscriptionById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedBy = req.user._id; // Assign logged-in user

    const updatedSubscription = await subscriptionsService.updateSubscription(
      req.user._id,
      id,
      updateData
    );

    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({
      message: "Subscription updated successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubscription = await subscriptionsService.deleteSubscription(
      id
    );

    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
