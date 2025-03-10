const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
    to: [{ type: String, required: true }], // Recipients category (e.g., Visitors, Members)
    sentTo: [{ type: String }], // Successfully sent emails
    failedRecipients: [{ 
        email: { type: String },
        reason: { type: String } 
    }], // Failed emails with reasons
    message: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Sent', 'Failed', 'Partial Success'], default: 'Pending' },
    sentAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', EmailSchema);
