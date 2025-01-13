const db = require('../../db');

// Add new user with resume
const createUser = async (name, email, phone, hashedPassword, resume) => {
    const [result] = await db.query(
        'INSERT INTO signin (name, email, phone, password, resume) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, hashedPassword, resume]
    );
    return result.insertId;
};

// Find user by email
const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM signin WHERE email = ?', [email]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail };
