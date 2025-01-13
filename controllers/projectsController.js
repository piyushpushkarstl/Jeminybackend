const {
    getAllProjects,
    getProjectsById,
    addProject,
    deleteProject,
} = require('../backend/models/projects');

const fetchAllProjects = async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
};

const fetchProjectsById = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await getProjectsById(id);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
};

const createProject = async (req, res) => {
    const { candidateId, projectTitle, client, projectStatus, workedFrom, detailsOfProject } = req.body;

    try {
        const id = await addProject(candidateId, projectTitle, client, projectStatus, workedFrom, detailsOfProject);
        res.status(201).json({ message: 'Project added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add project', details: error.message });
    }
};

const removeProject = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteProject(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Project deleted' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project', details: error.message });
    }
};

module.exports = {
    fetchAllProjects,
    fetchProjectsById,
    createProject,
    removeProject,
};
