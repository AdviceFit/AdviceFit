const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  package: {
    type: String,
    required: true,
    trim: true,
  },
  promoCoupon: {
    type: String,
    trim: true,
  },
  offerAmount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
    trim: true,
  },
  paymentDueDate: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    trim: true,
  },
});

module.exports = subscriptionSchema;
