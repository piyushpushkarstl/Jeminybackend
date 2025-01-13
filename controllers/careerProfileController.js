const {
    getAllCareerProfiles,
    getCareerProfileById,
    addCareerProfile,
    deleteCareerProfile,
} = require('../backend/models/careerProfile');

const fetchAllCareerProfiles = async (req, res) => {
    try {
        const profiles = await getAllCareerProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch career profiles', details: error.message });
    }
};

const fetchCareerProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await getCareerProfileById(id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch career profile', details: error.message });
    }
};

const createCareerProfile = async (req, res) => {
    const {
        candidateId,
        currentIndustry,
        department,
        desiredJobType,
        desiredEmploymentType,
        preferredShift,
        preferredWorkLocation,
        expectedSalary,
    } = req.body;

    try {
        const id = await addCareerProfile(
            candidateId,
            currentIndustry,
            department,
            desiredJobType,
            desiredEmploymentType,
            preferredShift,
            preferredWorkLocation,
            expectedSalary
        );
        res.status(201).json({ message: 'Career profile added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add career profile', details: error.message });
    }
};

const removeCareerProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteCareerProfile(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Career profile deleted' });
        } else {
            res.status(404).json({ message: 'Career profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete career profile', details: error.message });
    }
};

module.exports = {
    fetchAllCareerProfiles,
    fetchCareerProfileById,
    createCareerProfile,
    removeCareerProfile,
};
