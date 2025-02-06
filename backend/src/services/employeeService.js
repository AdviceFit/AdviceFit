const Employee = require('../models/employeeModel');

exports.createEmployee = async (employeeData) => {
    return await Employee.create(employeeData);
};

exports.getAllEmployees = async () => {
    return await Employee.find({ isDeleted: false })
        .populate('center', 'name location') // Replace with actual fields from the Center model
        .populate('createdBy', 'name email');
};

exports.getEmployeesByUser = async (userId) => {
    return await Employee.find({ createdBy: userId, isDeleted: false });
};

exports.updateEmployee = async (id, updateData) => {
    return await Employee.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, {
        new: true,
        runValidators: true,
    });
};

exports.findEmployeeById = async (id) => {
    return await Employee.findById(id);
};
exports.deleteEmployee = async (id, userId) => {
    const employee = await Employee.findOne({ _id: id, isDeleted: false });
    if (!employee) return null;
    employee.isDeleted = true;
    employee.deletedBy = userId;
    return await employee.save();
};
