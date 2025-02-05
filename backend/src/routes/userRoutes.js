const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Signup Route
router.post('/signup', userController.signup);

// Login Route
router.post('/login', userController.login);

// Me Route
router.get('/me', authMiddleware.authenticate, userController.getMe);

module.exports = router;
