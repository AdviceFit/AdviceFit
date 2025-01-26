const employeeService = require('../services/employeeService');

exports.createEmployee = async (req, res) => {
    try {
        const employeeData = { ...req.body, createdBy: req.user._id }; // Attach the logged-in user's ID
        const employee = await employeeService.createEmployee(employeeData);
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getEmployeesByUser = async (req, res) => {
    try {
        const userId = req.user._id; // Get the logged-in user's ID from req.user
        console.log("Fetching members for user:", userId);

        // Fetch members associated with this user
        const employees = await employeeService.getEmployeesByUser(userId);

        res.status(200).json({ employees });
    } catch (error) {
        console.log('hiiiiiiiiiiiiii')
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(req.params.id, {
            ...req.body,
            updatedBy: req.user._id,
        });
        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.status(200).json({ success: true, data: updatedEmployee });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await employeeService.deleteEmployee(req.params.id, req.user._id);
        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
