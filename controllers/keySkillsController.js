const {
    getAllKeySkills,
    getKeySkillById,
    addKeySkill,
    deleteKeySkill,
} = require('../backend/models/keySkills');

const fetchAllKeySkills = async (req, res) => {
    try {
        const skills = await getAllKeySkills();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch key skills', details: error.message });
    }
};

const fetchKeySkillsById = async (req, res) => {
    const { id } = req.params;
    try {
        const skills = await getKeySkillById(id);
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch key skills', details: error.message });
    }
};

const createKeySkill = async (req, res) => {
    const { candidateId, skill } = req.body;
    try {
        const id = await addKeySkill(candidateId, skill);
        res.status(201).json({ message: 'Key skill added', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add key skill', details: error.message });
    }
};

const removeKeySkill = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteKeySkill(id);
        if (affectedRows) {
            res.status(200).json({ message: 'Key skill deleted' });
        } else {
            res.status(404).json({ message: 'Key skill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete key skill', details: error.message });
    }
};

module.exports = {
    fetchAllKeySkills,
    fetchKeySkillsById,
    createKeySkill,
    removeKeySkill,
};
