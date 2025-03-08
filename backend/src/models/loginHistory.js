const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: false,
  }
);

loginHistorySchema.methods.addLoginHistory = async function () {
  await this.save();
};

module.exports = mongoose.model("LoginHistory", loginHistorySchema);
