const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const centerSchema = require('./centerModel');

const employeeSchema = new mongoose.Schema(
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
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['Center Manager', 'Reception', 'Trainer', 'Accountant', 'Housekeeping'],
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: [true, 'Center is required'],
    },
    joining_date: {
      type: Date,
      required: [true, 'Joining date is required'],
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    anniversary_date: {
      type: Date,
      required: false,
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
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    description: {
      type: String,
      required: false,
    },
    employee_id_proof: {
      type: String,
      required: false,
      default: 'None',
      validate: {
        validator: (value) => value === 'None' || /^https?:\/\/.+\.(jpg|jpeg|png|pdf)$/i.test(value),
        message: 'Employee ID proof must be a valid URL if provided',
      },
    },
    address: {
      type: addressSchema,
      required: true,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
