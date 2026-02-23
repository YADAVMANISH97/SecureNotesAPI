// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    try {
        // Check if user exists and has admin role
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isAdmin;
