const LoginHistory = require('../models/loginHistory');
const Member = require('../models/memberModel');
const User = require('../models/userModel');

// Find a user by email
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Find a member by email
exports.findMemberByEmail = async (email) => {
    return await Member.findOne({ email });
};

// Create a new user
exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.getHistory = async () => {
    return await LoginHistory.find({ isDeleted: false }).populate('userId', 'email gym_owner_name');
};
