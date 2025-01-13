const db = require('../../db');

const getAllITSkills = async () => {
    const [rows] = await db.query('SELECT * FROM IT_Skills');
    return rows;
};

const getITSkillById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM IT_Skills WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addITSkill = async (candidateId, softwareName, softwareVersion, experience) => {
    const [result] = await db.query(
        'INSERT INTO IT_Skills (candidate_id, software_name, software_version, experience) VALUES (?, ?, ?, ?)',
        [candidateId, softwareName, softwareVersion, experience]
    );
    return result.insertId;
};

const deleteITSkill = async (id) => {
    const [result] = await db.query('DELETE FROM IT_Skills WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllITSkills,
    getITSkillById,
    addITSkill,
    deleteITSkill,
};
