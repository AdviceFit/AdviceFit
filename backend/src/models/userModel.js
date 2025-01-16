const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gym_name: {
        type: String,
        required: true,
    },
    gym_owner_name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }, 
    pincode: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);