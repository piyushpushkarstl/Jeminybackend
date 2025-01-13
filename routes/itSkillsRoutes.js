const express = require('express');
const {
    fetchAllITSkills,
    fetchITSkillsById,
    createITSkill,
    removeITSkill,
} = require('../controllers/itSkillsController');

const router = express.Router();

router.get('/', fetchAllITSkills);
router.get('/:id', fetchITSkillsById);
router.post('/', createITSkill);
router.delete('/:id', removeITSkill);

module.exports = router;
