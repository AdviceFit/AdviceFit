const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const emailController = require('../controllers/emailController');


//add-JWT for auth  (remove temporaryly)
router.post('/', emailController.sendEmail);
router.get('/', emailController.getEmails);

module.exports = router;
