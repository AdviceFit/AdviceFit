const Member = require('../models/memberModel');

// Find a member by ID
exports.findMemberById = async (id) => {
    return await Member.findById(id).populate('center', '_id name');;
};

// Find all members
exports.findAllMembers = async () => {
    return await Member.find().populate('center', '_id name');
};

// Create a new member
exports.createMember = async (memberData) => {
    const member = new Member(memberData);
    return await member.save();
};

// Find a member by filter
exports.findMemberByFilter = async (filter) => {
    return await Member.findOne(filter);
};

exports.findMembersByUser = async (userId) => {
    return await Member.find({ createdBy: userId, isDeleted: false }).populate('center', '_id name');;
};

// Update a member by ID
exports.updateMember = async (id, updateData) => {
    return await Member.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a member by ID
exports.deleteMember = async (id) => {
    return await Member.findByIdAndDelete(id);
};
