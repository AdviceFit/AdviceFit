const attendanceService = require('../services/attendanceService');

// Create Attendance
exports.createAttendance = async (req, res) => {
    try {
        // Get the authenticated user from the request (set by the authenticate middleware)
        const createdBy = req.user._id;

        // Prepare the attendance data, including createdBy field
        const attendanceData = {
            ...req.body,  // Body from the client (which contains member, time_in, time_out, etc.)
            createdBy     // Add createdBy field from the authenticated user
        };

        // Create the attendance record
        const attendance = await attendanceService.createAttendance(attendanceData);

        // Respond with the created attendance
        res.status(201).json({ success: true, data: attendance });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get All Attendance
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceList = await attendanceService.getAllAttendance();
        res.status(200).json({ success: true, data: attendanceList });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get Attendance By User (using authenticated user from middleware)
exports.getAttendanceByUser = async (req, res) => {
    try {
        const userId = req.user._id; // Get userId from the authenticated user
        const attendanceRecords = await attendanceService.getAttendanceByUser(userId);

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ success: false, message: 'No attendance records found for this user' });
        }

        return res.status(200).json({ success: true, data: attendanceRecords });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get Attendance By ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await attendanceService.getAttendanceById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance not found' });
        }
        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update Attendance
exports.updateAttendance = async (req, res) => {
    try {
        const attendance = await attendanceService.updateAttendance(req.params.id, req.body);
        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance not found' });
        }
        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Attendance
exports.deleteAttendance = async (req, res) => {
    try {
        const deleted = await attendanceService.deleteAttendance(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Attendance not found' });
        }
        res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
