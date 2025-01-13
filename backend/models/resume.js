const db = require('../../db');

const getAllResumes = async () => {
    const [rows] = await db.query('SELECT * FROM Resume');
    return rows;
};

const getResumeById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Resume WHERE candidate_id = ?', [candidateId]);
    return rows[0];
};

const addResume = async (candidateId, resume) => {
    const [result] = await db.query(
        'INSERT INTO Resume (candidate_id, resume) VALUES (?, ?)',
        [candidateId, resume]
    );
    return result.insertId;
};

const updateResume = async (candidateId, updates) => {
    const [result] = await db.query('UPDATE Resume SET ? WHERE candidate_id = ?', [updates, candidateId]);
    return result.affectedRows;
};

const deleteResume = async (candidateId) => {
    const [result] = await db.query('DELETE FROM Resume WHERE candidate_id = ?', [candidateId]);
    return result.affectedRows;
};

module.exports = {
    getAllResumes,
    getResumeById,
    addResume,
    updateResume,
    deleteResume,
};
