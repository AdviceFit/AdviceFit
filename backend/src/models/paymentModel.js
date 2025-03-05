const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  // role: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "subscription",
  //   required: true,
  // },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = paymentSchema;
