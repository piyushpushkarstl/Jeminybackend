const db = require('../../db');

const getAllProfileSummaries = async () => {
    const [rows] = await db.query('SELECT * FROM Profile_Summary');
    return rows;
};

const getProfileSummaryById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Profile_Summary WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addProfileSummary = async (candidateId, profileSummary) => {
    const [result] = await db.query(
        'INSERT INTO Profile_Summary (candidate_id, profile_summary) VALUES (?, ?)',
        [candidateId, profileSummary]
    );
    return result.insertId;
};

const deleteProfileSummary = async (id) => {
    const [result] = await db.query('DELETE FROM Profile_Summary WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllProfileSummaries,
    getProfileSummaryById,
    addProfileSummary,
    deleteProfileSummary,
};
