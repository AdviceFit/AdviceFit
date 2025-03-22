const { default: mongoose } = require('mongoose');
const addressSchema = require('./addressModel');

const centerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        centerCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        centerEmail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        mobileNo: {
            type: String,
            required: true,
            trim: true,
            match: /^\+[1-9]{1}[0-9]{1,14}$/, // E.164 international format
        },        
        workPhone: {
            type: String,
            trim: false,
            required: false
        },
        gstNumber: {
            type: String,
            trim: true,
            required: false,
        },
        agency: {
            type: String,
            trim: false,
        },
        biometricSerialNumber: {
            type: String,
            trim: false,
        },
        address: addressSchema, // Embedding the address schema
        aboutUs: {
            type: String,
            trim: false,
        },
        termsAndConditions: {
            type: String,
            trim: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
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

centerSchema.pre("find", function (next) {
    this.where({ isDeleted: false });
    this.sort({ createdAt: -1 });
    next();
  });

module.exports = mongoose.model('Center', centerSchema);

