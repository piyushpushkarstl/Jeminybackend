const {
    getAllCertifications,
    getCertificationById,
    addCertification,
    deleteCertification,
} = require('../backend/models/certifications');

const fetchAllCertifications = async (req, res) => {
    try {
        const certifications = await getAllCertifications();
        res.status(200).json(certifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch certifications', details: error.message });
    }
};

const fetchCertificationById = async (req, res) => {
    const { id } = req.params;
    try {
        const certification = await getCertificationById(id);
        res.status(200).json(certification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch certification', details: error.message });
    }
};

const createCertification = async (req, res) => {
    const { candidateId, name, url } = req.body;

    try {
        const id = await addCertification(candidateId, name, url);
        res.status(201).json({ message: 'Certification added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add certification', details: error.message });
    }
};

const removeCertification = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteCertification(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Certification deleted' });
        } else {
            res.status(404).json({ message: 'Certification not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete certification', details: error.message });
    }
};

module.exports = {
    fetchAllCertifications,
    fetchCertificationById,
    createCertification,
    removeCertification,
};
