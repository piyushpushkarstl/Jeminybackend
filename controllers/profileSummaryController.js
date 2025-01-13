const {
    getAllProfileSummaries,
    getProfileSummaryById,
    addProfileSummary,
    deleteProfileSummary,
} = require('../backend/models/profileSummary');

const fetchAllProfileSummaries = async (req, res) => {
    try {
        const summaries = await getAllProfileSummaries();
        res.status(200).json(summaries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile summaries', details: error.message });
    }
};

const fetchProfileSummaryById = async (req, res) => {
    const { id } = req.params;
    try {
        const summary = await getProfileSummaryById(id);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile summary', details: error.message });
    }
};

const createProfileSummary = async (req, res) => {
    const { candidateId, profileSummary } = req.body;
    try {
        const id = await addProfileSummary(candidateId, profileSummary);
        res.status(201).json({ message: 'Profile summary added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add profile summary', details: error.message });
    }
};

const removeProfileSummary = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteProfileSummary(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Profile summary deleted' });
        } else {
            res.status(404).json({ message: 'Profile summary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete profile summary', details: error.message });
    }
};

module.exports = {
    fetchAllProfileSummaries,
    fetchProfileSummaryById,
    createProfileSummary,
    removeProfileSummary,
};
