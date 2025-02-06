const express = require('express');
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes with the authenticate middleware
router.use(authMiddleware.authenticate);

// Define routes
router.post('/', employeeController.createEmployee); // Create Employee
router.get('/', employeeController.getAllEmployees); // Get All Employees
// router.get('/:id', employeeController.getEmployeesByUser); // Get Employee by ID
router.get('/:id',  employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee); // Update Employee
router.delete('/:id', employeeController.deleteEmployee); // Delete Employee (Soft Delete)

module.exports = router;
