const express = require('express');
const {
    fetchAllCareerProfiles,
    fetchCareerProfileById,
    createCareerProfile,
    removeCareerProfile,
} = require('../controllers/careerProfileController');

const router = express.Router();

router.get('/', fetchAllCareerProfiles);
router.get('/:id', fetchCareerProfileById);
router.post('/', createCareerProfile);
router.delete('/:id', removeCareerProfile);

module.exports = router;
