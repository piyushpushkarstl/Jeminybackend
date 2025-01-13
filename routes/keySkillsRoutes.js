const express = require('express');
const {
    fetchAllKeySkills,
    fetchKeySkillsById,
    createKeySkill,
    removeKeySkill,
} = require('../controllers/keySkillsController');

const router = express.Router();

router.get('/', fetchAllKeySkills);
router.get('/:id', fetchKeySkillsById);
router.post('/', createKeySkill);
router.delete('/:id', removeKeySkill);

module.exports = router;
