const express = require('express');
const router = express.Router();
const bulkMessageController = require('../controllers/bulkMessageController');

// Define the bulk messaging route
router.post('/', bulkMessageController.sendBulkMessage);

module.exports = router;
