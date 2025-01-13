const {
    getAllSocialProfiles,
    getSocialProfileById,
    addSocialProfile,
    deleteSocialProfile,
} = require('../backend/models/socialProfile');

const fetchAllSocialProfiles = async (req, res) => {
    try {
        const profiles = await getAllSocialProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch social profiles', details: error.message });
    }
};

const fetchSocialProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await getSocialProfileById(id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch social profile', details: error.message });
    }
};

const createSocialProfile = async (req, res) => {
    const { candidateId, socialProfile, url } = req.body;

    try {
        const id = await addSocialProfile(candidateId, socialProfile, url);
        res.status(201).json({ message: 'Social profile added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add social profile', details: error.message });
    }
};

const removeSocialProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteSocialProfile(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Social profile deleted' });
        } else {
            res.status(404).json({ message: 'Social profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete social profile', details: error.message });
    }
};

module.exports = {
    fetchAllSocialProfiles,
    fetchSocialProfileById,
    createSocialProfile,
    removeSocialProfile,
};
