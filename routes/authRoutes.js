const express = require('express');
const { signupUser, signinUser, verifyOtp, upload } = require('../controllers/authController');

const router = express.Router();

// Signup route with file upload
router.post('/signup', upload.single('resume'), signupUser);

// Signin route
router.post('/signin', signinUser);

// OTP verification route
router.post('/verify-otp', verifyOtp);

module.exports = router;
