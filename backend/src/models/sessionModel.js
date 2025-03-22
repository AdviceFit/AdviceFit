const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Session title is required"],
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
      required: [true, "Center reference is required"],
    },
    session_date: {
      type: Date,
      required: [true, "Session date is required"],
    },
    start_time: {
      type: String,
      required: [true, "Start time is required"],
    },
    end_time: {
      type: String,
      required: [true, "End time is required"],
    },
    member_capacity: {
      type: Number,
      required: [true, "Member capacity is required"],
      min: 1,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

sessionSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  this.sort({ createdAt: -1 });
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
