const {
    getAllITSkills,
    getITSkillById,
    addITSkill,
    deleteITSkill,
} = require('../backend/models/itSkills');

const fetchAllITSkills = async (req, res) => {
    try {
        const skills = await getAllITSkills();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch IT skills', details: error.message });
    }
};

const fetchITSkillsById = async (req, res) => {
    const { id } = req.params;
    try {
        const skills = await getITSkillById(id);
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch IT skills', details: error.message });
    }
};

const createITSkill = async (req, res) => {
    const { candidateId, softwareName, softwareVersion, experience } = req.body;
    try {
        const id = await addITSkill(candidateId, softwareName, softwareVersion, experience);
        res.status(201).json({ message: 'IT skill added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add IT skill', details: error.message });
    }
};

const removeITSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteITSkill(id);
        if (affectedRows) {
            res.status(200).json({ message: 'IT skill deleted' });
        } else {
            res.status(404).json({ message: 'IT skill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete IT skill', details: error.message });
    }
};

module.exports = {
    fetchAllITSkills,
    fetchITSkillsById,
    createITSkill,
    removeITSkill,
};
