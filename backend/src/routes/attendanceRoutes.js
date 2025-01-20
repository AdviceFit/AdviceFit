const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const authenticateMiddleware = require('../middlewares/authMiddleware'); // Import the authenticate middleware

const router = express.Router();

// Apply authenticate middleware on routes that need authentication
router.post('/', authenticateMiddleware.authenticate, attendanceController.createAttendance);
router.get('/', authenticateMiddleware.authenticate, attendanceController.getAllAttendance);
router.get('/user', authenticateMiddleware.authenticate, attendanceController.getAttendanceByUser); // No need for userId in params
router.get('/:id', authenticateMiddleware.authenticate, attendanceController.getAttendanceById);
router.put('/:id', authenticateMiddleware.authenticate, attendanceController.updateAttendance);
router.delete('/:id', authenticateMiddleware.authenticate, attendanceController.deleteAttendance);

module.exports = router;
