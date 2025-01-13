const db = require('../../db');

const getAllDashboardEntries = async () => {
    const [rows] = await db.query('SELECT * FROM dashboardcandidate');
    return rows;
};

const getDashboardEntryById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM dashboardcandidate WHERE candidate_id = ?', [candidateId]);
    return rows[0];
};

const addDashboardEntry = async (photo, fullName, location, fresherExperience, availability, phone, email) => {
    const [result] = await db.query(
        'INSERT INTO dashboardcandidate (photo, full_name, location, fresher_experience, availability_to_join, phone_no, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [photo, fullName, location, fresherExperience, availability, phone, email]
    );
    return result.insertId;
};

const updateDashboardEntry = async (candidateId, updates) => {
    const [result] = await db.query('UPDATE dashboardcandidate SET ? WHERE candidate_id = ?', [updates, candidateId]);
    return result.affectedRows;
};

const deleteDashboardEntry = async (candidateId) => {
    const [result] = await db.query('DELETE FROM dashboardcandidate WHERE candidate_id = ?', [candidateId]);
    return result.affectedRows;
};

module.exports = {
    getAllDashboardEntries,
    getDashboardEntryById,
    addDashboardEntry,
    updateDashboardEntry,
    deleteDashboardEntry,
};
