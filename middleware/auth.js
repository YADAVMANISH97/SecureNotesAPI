const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];

        // Verify token using secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
