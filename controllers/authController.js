const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file
const multer = require('multer');
const { createUser, findUserByEmail, updateOtp } = require('../backend/models/user');
const jwt = require('jsonwebtoken');


// Email configuration for OTP
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USERNAME, // Load from environment variable
        pass: process.env.MAIL_PASSWORD, // Load from environment variable
    },
    tls: {
        rejectUnauthorized: false, // Optional: Disable TLS checks for testing
    },
});

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Password validation regex (at least 8 characters, 1 number, 1 special character, 1 uppercase)
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Phone validation regex (exactly 10 digits)
const phoneRegex = /^\d{10}$/;

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Create the uploads directory if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Multer file filter for PDFs and Word documents
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and Word documents are allowed'), false);
    }
};

// Multer middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB file size limit
});

const signupUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password || !req.file) {
        return res.status(400).json({ error: 'All fields, including resume, are required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character',
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = String(crypto.randomInt(100000, 999999)); // Generates exactly a 6-digit OTP
        console.log('Generated OTP:', otp, 'Length:', otp.length); // Debugging log to ensure correctness

        // Generate OTP expiry time
        const otp_expiry = new Date(Date.now() + 30 * 60 * 1000); // OTP expires in 30 minutes

        // Insert user data, including OTP and otp_expiry, into the database
        const sql = `
            INSERT INTO signin (name, email, password, phone, resume, otp, otp_expiry)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Get a connection from the pool
        const pool = require('../db'); // Your database connection pool
        const resumeBuffer = req.file.buffer; // Save the uploaded resume as binary

        await pool.query(sql, [name, email, hashedPassword, phone, resumeBuffer, otp, otp_expiry]);

        // Send OTP via email
        await transporter.sendMail({
            from: process.env.MAIL_DEFAULT_SENDER, // Load default sender from environment variable
            to: email,
            subject: 'Your Signup OTP',
            text: `Your OTP for signup is: ${otp}`,
        });

        res.status(201).json({
            message: 'User created successfully. OTP sent to your email for verification.',
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};


const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Retrieve the user's OTP and expiry from the database
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { otp: storedOtp, otp_expiry } = user;

        if (!storedOtp || new Date(otp_expiry) < new Date()) {
            return res.status(404).json({ error: 'OTP not found or expired' });
        }

        if (storedOtp !== otp.toString()) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // OTP verified successfully; clear OTP and expiry
        await updateOtp(email, null, null);

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: 'OTP verification failed', details: error.message });
    }
};


// Signin Handler (unchanged)
const signinUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.candidate_id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key from your .env file
            { expiresIn: '1h' } // Token expiration time
        );

        res.status(200).json({
            message: 'Login successful',
            userId: user.candidate_id,
            token, // Return the token in the response
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login', details: error.message });
    }
};

module.exports = { signupUser, signinUser, verifyOtp, upload };
