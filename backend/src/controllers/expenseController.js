const ExpenseService = require('../services/expenseService');

// Create Expense
exports.createExpense = async (req, res) => {
    try {
        const expenseData = req.body;
        expenseData.createdBy = req.user._id;

        const newExpense = await ExpenseService.createExpense(expenseData);
        res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expense = await ExpenseService.findAllExpenses();
        res.status(200).json({ expense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Expenses Created by Logged-in User
exports.getExpensesByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const expense = await ExpenseService.findExpensesByUser(userId);
        res.status(200).json({ expense});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Expense by ID
exports.getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await ExpenseService.findExpenseById(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ expense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Expense
exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedBy = req.user._id;

        const updatedExpense = await ExpenseService.updateExpense(id, updateData);

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Soft Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await ExpenseService.updateExpense(id, {
            isDeleted: true,
            deletedBy: req.user._id,
        });

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
