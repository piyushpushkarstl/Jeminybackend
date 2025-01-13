const db = require('../../db');

const getAllProjects = async () => {
    const [rows] = await db.query('SELECT * FROM Projects');
    return rows;
};

const getProjectsById = async (candidateId) => {
    const [rows] = await db.query('SELECT * FROM Projects WHERE candidate_id = ?', [candidateId]);
    return rows;
};

const addProject = async (candidateId, projectTitle, client, projectStatus, workedFrom, detailsOfProject) => {
    const [result] = await db.query(
        `INSERT INTO Projects (
            candidate_id, 
            project_title, 
            client, 
            project_status, 
            worked_from, 
            details_of_project
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [candidateId, projectTitle, client, projectStatus, workedFrom, detailsOfProject]
    );
    return result.insertId;
};

const deleteProject = async (id) => {
    const [result] = await db.query('DELETE FROM Projects WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllProjects,
    getProjectsById,
    addProject,
    deleteProject,
};
