const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        console.log("🚀 ~ exports.authenticate= ~ user:", user)

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};