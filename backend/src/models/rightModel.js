const mongoose = require("mongoose");

const rightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Unique identifier for each right
    },
    actions: {
      type: [String], // ["Add", "Edit", "Delete", etc.]
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Right", rightSchema);
