const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const bulkMessageController = require('../controllers/bulkMessageController');

// Define the bulk messaging route
router.post('/',  authMiddleware.authenticate, bulkMessageController.sendBulkMessage);
router.get('/', authMiddleware.authenticate, bulkMessageController.getBulkMessages); 


module.exports = router;
