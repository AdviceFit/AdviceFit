const express = require('express');
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/initialize', authMiddleware.authenticate, OrderController.createOrder);

router.post('/verify-payment', OrderController.verifyPayment);  

module.exports = router;
