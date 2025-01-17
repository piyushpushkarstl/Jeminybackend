const db = require('../../db');

// Add new user with resume and OTP details
const createUser = async (name, email, phone, hashedPassword, resume, otp, otpExpiry) => {
    const [result] = await db.query(
        'INSERT INTO signin (name, email, phone, password, resume, otp, otp_expiry) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, hashedPassword, resume, otp, otpExpiry]
    );
    return result.insertId;
};

// Find user by email
const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM signin WHERE email = ?', [email]);
    return rows[0];
};

// Update OTP and expiry for a user
const updateOtp = async (email, otp, otpExpiry) => {
    await db.query(
        'UPDATE signin SET otp = ?, otp_expiry = ? WHERE email = ?',
        [otp, otpExpiry, email]
    );
};

// Remove OTP for a user after successful verification
const clearOtp = async (email) => {
    await db.query('UPDATE signin SET otp = NULL, otp_expiry = NULL WHERE email = ?', [email]);
};

module.exports = { createUser, findUserByEmail, updateOtp, clearOtp };
