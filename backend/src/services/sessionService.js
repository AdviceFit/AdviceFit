const Session = require('../models/sessionModel');

// Create a new session
exports.createSession = async (sessionData) => {
    const session = new Session(sessionData);
    return await session.save();
};

// Get all sessions (excluding deleted ones)
exports.findAllSessions = async () => {
    return await Session.find({ isDeleted: false }).populate("center", "name centerCode");;
};

// Get session by ID
exports.findSessionById = async (id) => {
    return await Session.findOne({ _id: id, isDeleted: false }).populate("center", "name centerCode");;
};

// Update session by ID
exports.updateSession = async (id, updateData) => {
    return await Session.findByIdAndUpdate(id, updateData, { new: true });
};
