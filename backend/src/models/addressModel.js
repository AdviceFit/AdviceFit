const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    addressLine1: {
        type: String,
        trim: true,
    },
    addressLine2: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim:  true,
    },
    pincode: {
        type: Number,
        trim: true,
        match: /^[0-9]{6}$/,
    },
});

module.exports = addressSchema;
