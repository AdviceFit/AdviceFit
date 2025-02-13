const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        expense_title: {
            type: String,
            required: [true, 'Expense title is required'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        type_of_expense: {
            type: String,
            required: [true, 'Type of expense is required'],
            enum: [
                'Electric Bill',
                'Water Bill',
                'Internet Bill',
                'Medical Kit',
                'Cleaning Kit',
                'AC Service',
                'Rent',
                'Employee Salary',
                'Other',
            ],
        },
        center: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Center',
            required: [true, 'Center is required'],
        },
        expense_date: {
            type: Date,
            required: [true, 'Expense date is required'],
        },
        payment_mode: {
            type: String,
            required: [true, 'Payment mode is required'],
            enum: ['Cash', 'Cheque', 'Paytm', 'Bank Transfer', 'UPI', 'Card'],
        },
        comment: {
            type: String,
            required: false,
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

module.exports = mongoose.model('Expense', expenseSchema);
