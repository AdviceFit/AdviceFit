const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    addressLine1: {
        type: String,
        trim: true,
        required: true,
    },
    addressLine2: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{6}$/, // Validates 6-digit postal codes
    },
});

module.exports = addressSchema;
