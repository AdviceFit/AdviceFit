const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center", 
      required: true,
    },
    productType: {
      type: String,
      enum: ["General", "Gift", "Registration", "Session"],
      required: true,
    },
    noOfDays: {
      type: Number,
      required: true,
      min: 1,
    },
    packageTiming: {
      type: String,
      enum: ["Normal Hours", "Sunny Hours"],
      required: true,
    },
    trainingType: {
      type: String,
      enum: ["General", "Personal"],
      required: true,
    },
    packageType: {
      type: String,
      enum: ["Main", "Add On"],
      required: true,
    },
    freezeSubscription: {
      enabled: {
        type: Boolean,
        required: true,
        default: false,
      },
      maxFreezeDuration: {
        type: Number,
        required: function () {
          return this.freezeSubscription?.enabled; // Only required if freeze is enabled
        },
        min: [1, "Max duration must be greater than 0 when freeze is enabled."],
      },
    },
    
    showAtAdviceFit: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  this.sort({ createdAt: -1 });
  next();
});

module.exports = mongoose.model("Package", packageSchema);
