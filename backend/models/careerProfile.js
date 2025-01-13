const db = require('../../db');

const getAllCareerProfiles = async () => {
    const [rows] = await db.query('SELECT * FROM Career_Profile');
    return rows;
};

const getCareerProfileById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Career_Profile WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addCareerProfile = async (
    candidateId,
    currentIndustry,
    department,
    desiredJobType,
    desiredEmploymentType,
    preferredShift,
    preferredWorkLocation,
    expectedSalary
) => {
    const [result] = await db.query(
        `INSERT INTO Career_Profile (
            candidate_id, 
            current_industry, 
            department, 
            desired_job_type, 
            desired_employment_type, 
            preferred_shift, 
            preferred_work_location, 
            expected_salary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            candidateId,
            currentIndustry,
            department,
            desiredJobType,
            desiredEmploymentType,
            preferredShift,
            preferredWorkLocation,
            expectedSalary,
        ]
    );
    return result.insertId;
};

const deleteCareerProfile = async (id) => {
    const [result] = await db.query('DELETE FROM Career_Profile WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllCareerProfiles,
    getCareerProfileById,
    addCareerProfile,
    deleteCareerProfile,
};
