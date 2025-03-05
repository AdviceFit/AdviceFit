const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  variables: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Transactional", "Promotional"],
  },
  services: {
    type: [String],
    required: true,
    enum: ["SMS", "Whatsapp"], 
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
