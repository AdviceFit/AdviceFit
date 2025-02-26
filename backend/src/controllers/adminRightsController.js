const AdminRights = require("../models/adminRightsModel");

// Get Admin Rights data
exports.getAdminRightsData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find admin rights for the user
    const adminRights = await AdminRights.findOne({ user_id: userId });

    if (!adminRights) {
      return res.status(200).json({ adminRightsData: {} });
    }

    res.status(200).json({ adminRightsData: adminRights.adminRightsData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin rights" });
  }
};

// Update Admin Rights data
exports.updateAdminRightsData = async (req, res) => {
  try {
    const userId = req.user._id;
    let { adminRightsData } = req.body;

    if (!adminRightsData || typeof adminRightsData !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    if (adminRightsData.adminRightsData) {
      adminRightsData = adminRightsData.adminRightsData;
    }

    const sanitizedData = JSON.parse(JSON.stringify(adminRightsData));

    const result = await AdminRights.findOneAndUpdate(
      { user_id: userId },
      { $set: { adminRightsData: sanitizedData } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Admin rights updated successfully",
      updatedRights: result.adminRightsData,
    });
  } catch (error) {
    console.error("Error updating admin rights:", error);
    res.status(500).json({ error: "Failed to update admin rights" });
  }
};
