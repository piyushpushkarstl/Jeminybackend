const db = require('../../db');

const getAllResumeHeadlines = async () => {
    const [rows] = await db.query('SELECT * FROM Resume_Headline');
    return rows;
};

const getResumeHeadlineById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Resume_Headline WHERE candidate_id = ?', [candidateId]);
    return rows[0];
};

const addResumeHeadline = async (candidateId, resumeHeadline) => {
    const [result] = await db.query(
        'INSERT INTO Resume_Headline (candidate_id, resume_headline) VALUES (?, ?)',
        [candidateId, resumeHeadline]
    );
    return result.insertId;
};

const updateResumeHeadline = async (candidateId, updates) => {
    const [result] = await db.query('UPDATE Resume_Headline SET ? WHERE candidate_id = ?', [updates, candidateId]);
    return result.affectedRows;
};

const deleteResumeHeadline = async (candidateId) => {
    const [result] = await db.query('DELETE FROM Resume_Headline WHERE candidate_id = ?', [candidateId]);
    return result.affectedRows;
};

module.exports = {
    getAllResumeHeadlines,
    getResumeHeadlineById,
    addResumeHeadline,
    updateResumeHeadline,
    deleteResumeHeadline,
};
