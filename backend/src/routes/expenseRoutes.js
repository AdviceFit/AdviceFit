const express = require('express');
const ExpenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, ExpenseController.createExpense);
router.get('/', authMiddleware.authenticate, ExpenseController.getAllExpenses);
router.get('/user', authMiddleware.authenticate, ExpenseController.getExpensesByUser);
router.get('/:id', authMiddleware.authenticate, ExpenseController.getExpenseById);
router.patch('/:id', authMiddleware.authenticate, ExpenseController.updateExpense);
router.delete('/:id', authMiddleware.authenticate, ExpenseController.deleteExpense);

module.exports = router;
