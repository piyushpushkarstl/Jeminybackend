const express = require('express');
const { signupUser, signinUser, verifyOtp, upload } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware'); // JWT middleware for protected routes
const pool = require('../db'); // Import the MySQL connection pool

const router = express.Router();

// Signup route with file upload
router.post('/signup', upload.single('resume'), signupUser);

// Signin route
router.post('/signin', signinUser);

// OTP verification route
router.post('/verify-otp', verifyOtp);

// Example of a protected route (if needed in the future)
router.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route', user: req.user });
});

// Delete user route
router.delete('/delete-user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const sql = `DELETE FROM signin WHERE candidate_id = ?`;
        const [result] = await pool.query(sql, [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
});

module.exports = router;
