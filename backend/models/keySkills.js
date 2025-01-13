const db = require('../../db');

const getAllKeySkills = async () => {
    const [rows] = await db.query('SELECT * FROM Key_Skills');
    return rows;
};

const getKeySkillById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Key_Skills WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addKeySkill = async (candidateId, skill) => {
    const [result] = await db.query(
        'INSERT INTO Key_Skills (candidate_id, key_skill) VALUES (?, ?)',
        [candidateId, skill]
    );
    return result.insertId;
};

const deleteKeySkill = async (id) => {
    const [result] = await db.query('DELETE FROM Key_Skills WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllKeySkills,
    getKeySkillById,
    addKeySkill,
    deleteKeySkill,
};
