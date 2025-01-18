const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        mobile: {
            type: Number,
            required: [true, 'Mobile number is required'],
            validate: {
                validator: (value) => /^\d{10}$/.test(value.toString()),
                message: 'Mobile number must be 10 digits',
            },
        },
        gym_member_code: {
            type: String,
            required: false,
        },
        joining_date: {
            type: Date,
            required: [true, 'Joining date is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            validate: {
                validator: (value) =>
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                    ),
                message: 'Invalid email format',
            },
        },
        center: {
            type: String,
            required: [true, 'Center is required'],
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Other'],
        },
        source: {
            type: String,
            required: false,
        },
        occupation: {
            type: String,
            required: false,
        },
        dob: {
            type: Date,
            required: false,
        },
        health_conditions: {
            type: String,
            required: false,
            default: 'None',
        },
        marital_status: {
            type: String,
            required: false,
            enum: ['Single', 'Married', 'Divorced', 'Widowed'],
        },
        member_id_proof: {
            type: String,
            required: false,
            default: 'None',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Member', memberSchema);
