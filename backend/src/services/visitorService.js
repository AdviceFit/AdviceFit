const Visitor = require('../models/visitorModel');

// Create a new visitor
exports.createVisitor = async (visitorData) => {
    const visitor = new Visitor(visitorData);
    return await visitor.save();
};

// Get all visitors
exports.findAllVisitors = async () => {
    return await Visitor.find()
        .populate('visiting_center', '_id name')
};

// Get all visitors by User
exports.findVisitorsByUser = async (userId) => {
    return await Visitor.find({ createdBy: userId, isDeleted: false }).populate('visiting_center', '_id name')
};

// Get a visitor by ID
exports.findVisitorById = async (id) => {
    return await Visitor.findById(id).populate('visiting_center', '_id name')
};

// Update a visitor by ID
exports.updateVisitor = async (id, updateData) => {
    return await Visitor.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a visitor by ID
exports.deleteVisitor = async (id) => {
    return await Visitor.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
