const db = require('../../db');

const getAllCertifications = async () => {
    const [rows] = await db.query('SELECT * FROM Certification');
    return rows;
};

const getCertificationById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Certification WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addCertification = async (candidateId, name, url) => {
    const [result] = await db.query(
        'INSERT INTO Certification (candidate_id, name, url) VALUES (?, ?, ?)',
        [candidateId, name, url]
    );
    return result.insertId;
};

const deleteCertification = async (id) => {
    const [result] = await db.query('DELETE FROM Certification WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllCertifications,
    getCertificationById,
    addCertification,
    deleteCertification,
};
