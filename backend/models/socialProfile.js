const db = require('../../db');

const getAllSocialProfiles = async () => {
    const [rows] = await db.query('SELECT * FROM Social_Profile');
    return rows;
};

const getSocialProfileById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Social_Profile WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addSocialProfile = async (candidateId, socialProfile, url) => {
    const [result] = await db.query(
        'INSERT INTO Social_Profile (candidate_id, social_profile, url) VALUES (?, ?, ?)',
        [candidateId, socialProfile, url]
    );
    return result.insertId;
};

const deleteSocialProfile = async (id) => {
    const [result] = await db.query('DELETE FROM Social_Profile WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllSocialProfiles,
    getSocialProfileById,
    addSocialProfile,
    deleteSocialProfile,
};
