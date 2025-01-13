const db = require('../../db');

const getAllWorkSamples = async () => {
    const [rows] = await db.query('SELECT * FROM Work_Sample');
    return rows;
};

const getWorkSampleById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Work_Sample WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addWorkSample = async (candidateId, workTitle, url) => {
    const [result] = await db.query(
        'INSERT INTO Work_Sample (candidate_id, work_title, url) VALUES (?, ?, ?)',
        [candidateId, workTitle, url]
    );
    return result.insertId;
};

const deleteWorkSample = async (id) => {
    const [result] = await db.query('DELETE FROM Work_Sample WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllWorkSamples,
    getWorkSampleById,
    addWorkSample,
    deleteWorkSample,
};
