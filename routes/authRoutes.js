const express = require('express');
const { signupUser, signinUser, upload } = require('../controllers/authController');

const router = express.Router();

// Signup route with file upload
router.post('/signup', upload.single('resume'), signupUser);

// Signin route
router.post('/signin', signinUser);

module.exports = router;
