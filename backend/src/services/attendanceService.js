const Member = require('../models/memberModel')
const Attendance = require('../models/attendanceModel');

exports.createAttendance = async (attendanceData) => {
    return await Attendance.create(attendanceData);
};

exports.getAllAttendance = async () => {
    return await Attendance.find().populate('member', 'name'); // Populate member's name
};

exports.getAttendanceByUser = async (userId) => {
    console.log("🚀 ~ Fetching attendance records for user:", userId);
    
    // Fetch all members created by this user
    const members = await Member.find({ createdBy: userId});
    console.log("Members found:", members);

    if (members.length === 0) {
        console.log("No members linked to this user.");
        return []; // No members found, so no attendance records will exist
    }

    // Extract member IDs
    const memberIds = members.map((member) => member._id);
    console.log("Member IDs to query attendance:", memberIds);

    // Now fetch attendance records for these members
    const attendanceRecords = await Attendance.find({
        member: { $in: memberIds },
        isDeleted: false, // Ensure isDeleted is false for attendance records
    }).populate('member', 'name email');
    console.log("Attendance records found:", attendanceRecords);

    return attendanceRecords;
};

exports.getAttendanceById = async (id) => {
    return await Attendance.findById(id).populate('member', 'name');
};

exports.updateAttendance = async (id, updateData) => {
    return await Attendance.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

exports.deleteAttendance = async (id) => {
    const attendance = await Attendance.findById(id);
    if (!attendance) {
        return null;
    }
    attendance.isDeleted = true; // Soft delete
    return await attendance.save();
};
