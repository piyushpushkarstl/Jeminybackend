const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { createUser, findUserByEmail } = require('../backend/models/user');

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

// Multer file filter for PDF and Word documents
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

// Signup Handler
const signupUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password || !req.file) {
        return res.status(400).json({ error: 'All fields, including resume, are required' });
    }

    // Email validation
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Phone validation
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
    }

    // Password validation
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character',
        });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Read the resume file
        const resumePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        const resumeBuffer = fs.readFileSync(resumePath);

        // Save user data, including resume
        const userId = await createUser(name, email, phone, hashedPassword, resumeBuffer);

        // Clean up uploaded file after saving to DB
        fs.unlinkSync(resumePath);

        res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};

// Signin Handler
const signinUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Email validation
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Password validation
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'Invalid password format. Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character',
        });
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

        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login', details: error.message });
    }
};

module.exports = { signupUser, signinUser, upload };
