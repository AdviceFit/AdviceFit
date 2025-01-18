const Visitor = require('../models/visitorModel');

// Create a new visitor
exports.createVisitor = async (visitorData) => {
    const visitor = new Visitor(visitorData);
    return await visitor.save();
};

// Get all visitors
exports.findAllVisitors = async () => {
    return await Visitor.find();
};

// Get a visitor by ID
exports.findVisitorById = async (id) => {
    return await Visitor.findById(id);
};

// Update a visitor by ID
exports.updateVisitor = async (id, updateData) => {
    return await Visitor.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a visitor by ID
exports.deleteVisitor = async (id) => {
    return await Visitor.findByIdAndDelete(id);
};
