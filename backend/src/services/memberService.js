const Member = require('../models/memberModel');

// Find a member by ID
exports.findMemberById = async (id) => {
    return await Member.findById(id);
};

// Find all members
exports.findAllMembers = async () => {
    return await Member.find();
};

// Create a new member
exports.createMember = async (memberData) => {
    const member = new Member(memberData);
    return await member.save();
};

exports.findMembersByUser = async (userId) => {
    console.log("🚀 ~ exports.findMembersByUser= ~ userId:", userId)
    return await Member.find({ createdBy: userId, isDeleted: false });
};

// Update a member by ID
exports.updateMember = async (id, updateData) => {
    return await Member.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a member by ID
exports.deleteMember = async (id) => {
    return await Member.findByIdAndDelete(id);
};
