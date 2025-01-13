const db = require('../../db');

const getAllEmployments = async () => {
    const [rows] = await db.query('SELECT * FROM Employment');
    return rows;
};

const getEmploymentById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Employment WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addEmployment = async (
    candidateId,
    currentEmployment,
    employmentType,
    experience,
    currentCompanyName,
    currentJobTitle,
    joiningDate,
    currentSalary,
    skillUsed,
    jobProfile,
    noticePeriod
) => {
    const [result] = await db.query(
        `INSERT INTO Employment (
            candidate_id, 
            current_employment, 
            employment_type, 
            experience, 
            current_company_name, 
            current_job_title, 
            joining_date, 
            current_salary, 
            skill_used, 
            job_profile, 
            notice_period
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            candidateId,
            currentEmployment,
            employmentType,
            experience,
            currentCompanyName,
            currentJobTitle,
            joiningDate,
            currentSalary,
            skillUsed,
            jobProfile,
            noticePeriod,
        ]
    );
    return result.insertId;
};

const deleteEmployment = async (id) => {
    const [result] = await db.query('DELETE FROM Employment WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllEmployments,
    getEmploymentById,
    addEmployment,
    deleteEmployment,
};
