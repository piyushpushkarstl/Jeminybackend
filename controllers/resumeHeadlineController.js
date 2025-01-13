const {
    getAllResumeHeadlines,
    getResumeHeadlineById,
    addResumeHeadline,
    updateResumeHeadline,
    deleteResumeHeadline,
} = require('../backend/models/resumeHeadline');

const fetchAllResumeHeadlines = async (req, res) => {
    try {
        const headlines = await getAllResumeHeadlines();
        res.status(200).json(headlines);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resume headlines', details: error.message });
    }
};

const fetchResumeHeadlineById = async (req, res) => {
    const { id } = req.params;
    try {
        const headline = await getResumeHeadlineById(id);
        if (headline) {
            res.status(200).json(headline);
        } else {
            res.status(404).json({ message: 'Resume headline not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resume headline', details: error.message });
    }
};

const createResumeHeadline = async (req, res) => {
    const { candidateId, resumeHeadline } = req.body;
    try {
        const entryId = await addResumeHeadline(candidateId, resumeHeadline);
        res.status(201).json({ message: 'Resume headline added', entryId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add resume headline', details: error.message });
    }
};

const modifyResumeHeadline = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const affectedRows = await updateResumeHeadline(id, updates);
        if (affectedRows) {
            res.status(200).json({ message: 'Resume headline updated' });
        } else {
            res.status(404).json({ message: 'Resume headline not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update resume headline', details: error.message });
    }
};

const removeResumeHeadline = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteResumeHeadline(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Resume headline deleted' });
        } else {
            res.status(404).json({ message: 'Resume headline not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete resume headline', details: error.message });
    }
};

module.exports = {
    fetchAllResumeHeadlines,
    fetchResumeHeadlineById,
    createResumeHeadline,
    modifyResumeHeadline,
    removeResumeHeadline,
};
