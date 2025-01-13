const {
    getAllResumes,
    getResumeById,
    addResume,
    updateResume,
    deleteResume,
} = require('../backend/models/resume');

const fetchAllResumes = async (req, res) => {
    try {
        const resumes = await getAllResumes();
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resumes', details: error.message });
    }
};

const fetchResumeById = async (req, res) => {
    const { id } = req.params;
    try {
        const resume = await getResumeById(id);
        if (resume) {
            res.status(200).json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resume', details: error.message });
    }
};

const createResume = async (req, res) => {
    const { candidateId, resume } = req.body;
    try {
        const entryId = await addResume(candidateId, resume);
        res.status(201).json({ message: 'Resume added', entryId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add resume', details: error.message });
    }
};

const modifyResume = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const affectedRows = await updateResume(id, updates);
        if (affectedRows) {
            res.status(200).json({ message: 'Resume updated' });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update resume', details: error.message });
    }
};

const removeResume = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteResume(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Resume deleted' });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete resume', details: error.message });
    }
};

module.exports = {
    fetchAllResumes,
    fetchResumeById,
    createResume,
    modifyResume,
    removeResume,
};
