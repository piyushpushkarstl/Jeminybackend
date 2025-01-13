const db = require('../../db');

const getAllEducations = async () => {
    const [rows] = await db.query('SELECT * FROM Education');
    return rows;
};

const getEducationById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Education WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addEducation = async (
    candidateId,
    levelOfEducation,
    university,
    course,
    specialization,
    courseType,
    courseDuration,
    gradingSystem
) => {
    const [result] = await db.query(
        'INSERT INTO Education (candidate_id, level_of_education, university, course, specialization, course_type, course_duration, grading_system) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [candidateId, levelOfEducation, university, course, specialization, courseType, courseDuration, gradingSystem]
    );
    return result.insertId;
};

const deleteEducation = async (id) => {
    const [result] = await db.query('DELETE FROM Education WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllEducations,
    getEducationById,
    addEducation,
    deleteEducation,
};
