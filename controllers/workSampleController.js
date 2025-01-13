const {
    getAllWorkSamples,
    getWorkSampleById,
    addWorkSample,
    deleteWorkSample,
} = require('../backend/models/workSample');

const fetchAllWorkSamples = async (req, res) => {
    try {
        const samples = await getAllWorkSamples();
        res.status(200).json(samples);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch work samples', details: error.message });
    }
};

const fetchWorkSampleById = async (req, res) => {
    const { id } = req.params;
    try {
        const sample = await getWorkSampleById(id);
        res.status(200).json(sample);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch work sample', details: error.message });
    }
};

const createWorkSample = async (req, res) => {
    const { candidateId, workTitle, url } = req.body;

    try {
        const id = await addWorkSample(candidateId, workTitle, url);
        res.status(201).json({ message: 'Work sample added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add work sample', details: error.message });
    }
};

const removeWorkSample = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteWorkSample(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Work sample deleted' });
        } else {
            res.status(404).json({ message: 'Work sample not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete work sample', details: error.message });
    }
};

module.exports = {
    fetchAllWorkSamples,
    fetchWorkSampleById,
    createWorkSample,
    removeWorkSample,
};
