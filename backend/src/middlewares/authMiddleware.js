const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    console.log('inside the middleware')
    console.log(req.headers)
    try {
        const token = req.cookies.authToken||req.headers.authorization.split(' ')[1];
        console.log(token,"this is the token value")
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user
        next();
    } catch (error) {
        console.error('Authentication error:', error); 
        res.status(401).json({ message: 'Unauthorized' });
    }
};