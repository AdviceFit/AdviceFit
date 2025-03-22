const mongoose = require('mongoose');

const BulkMessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
    recipients: [{ type: String, enum: ['visitors', 'members', 'employees', 'liveMember', 'nonLiveMember'], required: true }],
    messageType: { type: String, enum: ['SMS', 'WhatsApp'], required: true },
    messageCategory: { type: String, enum: ['Transactional', 'Promotional'], required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Sent', 'Failed'], default: 'Pending' },
    sentAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

BulkMessageSchema.pre("find", function (next) {
    this.where({ isDeleted: false });
    this.sort({ createdAt: -1 });
    next();
  });

module.exports = mongoose.model('BulkMessage', BulkMessageSchema);
