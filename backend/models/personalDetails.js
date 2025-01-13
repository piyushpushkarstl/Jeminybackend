const db = require('../../db');

const getAllPersonalDetails = async () => {
    const [rows] = await db.query('SELECT * FROM Personal_Details');
    return rows;
};

const getPersonalDetailsById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Personal_Details WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addPersonalDetails = async (
    candidateId,
    gender,
    moreInformation,
    maritalStatus,
    dob,
    category,
    differentlyAbled,
    careerBreak,
    workPermitToUsa,
    workPermitToCountry,
    permanentAddress,
    homeTown,
    pinCode,
    languageProficiency
) => {
    const [result] = await db.query(
        `INSERT INTO Personal_Details (
            candidate_id, 
            gender, 
            more_information, 
            marital_status, 
            dob, 
            category, 
            differently_abled, 
            career_break, 
            work_permit_to_usa, 
            work_permit_to_country, 
            permanent_address, 
            home_town, 
            pin_code, 
            language_proficiency
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            candidateId,
            gender,
            moreInformation,
            maritalStatus,
            dob,
            category,
            differentlyAbled,
            careerBreak,
            workPermitToUsa,
            workPermitToCountry,
            permanentAddress,
            homeTown,
            pinCode,
            languageProficiency,
        ]
    );
    return result.insertId;
};

const deletePersonalDetails = async (id) => {
    const [result] = await db.query('DELETE FROM Personal_Details WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllPersonalDetails,
    getPersonalDetailsById,
    addPersonalDetails,
    deletePersonalDetails,
};
