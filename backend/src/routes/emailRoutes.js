const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const emailController = require('../controllers/emailController');

router.post('/', authMiddleware.authenticate, emailController.sendEmail);
router.get('/', authMiddleware.authenticate, emailController.getEmails);

module.exports = router;
