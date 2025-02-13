const Expense = require('../models/expenseModel');

// Find expense by ID
exports.findExpenseById = async (id) => {
    return await Expense.findById(id).populate("center", "name centerCode");
};
// Find all expenses
exports.findAllExpenses = async () => {
    return await Expense.find({ isDeleted: false }).populate("center", "name centerCode");
};

// Find all expenses created by a specific user and populate center details
exports.findExpensesByUser = async (userId) => {
    return await Expense.find({ createdBy: userId, isDeleted: false }).populate("center", "name centerCode");
};


// Create a new expense
exports.createExpense = async (expenseData) => {
    const expense = new Expense(expenseData);
    return await expense.save();
};

// Update an expense
exports.updateExpense = async (id, updateData) => {
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
};
