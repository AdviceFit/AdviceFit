const mongoose = require("mongoose");

const AdminRightsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  adminRightsData: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = mongoose.model("AdminRights", AdminRightsSchema);
